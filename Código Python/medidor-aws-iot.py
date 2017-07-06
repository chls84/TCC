from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTShadowClient
import sys
import time
import json
import getopt

# Import SPI library (for hardware SPI) and MCP3008 library.
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008

# Hardware SPI configuration:
SPI_PORT   = 0
SPI_DEVICE = 0
mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))

# Configure AWS IOT
thing_name = "medidor"
topic_consumo = "medidor/consumo"
topic_sms = "medidor/sms"

# Configure parameters
already_notificated = False
delay_s = 1

#Function measure current
def calculaConsumo():
    sensor = 0
    Consumo = 0
    sensibilidade = 0.185
    for num in range(0,1000):
        sensor = mcp.read_adc(0) * (5 / 1023.0)
        Consumo = Consumo + (sensor - 5) / sensibilidade
        time.sleep(0.001)
    Consumo = Consumo / 1000
    return Consumo

# Custom Shadow callback
def customShadowCallback_Update(payload, responseStatus, token):
    # payload is a JSON string ready to be parsed using json.loads(...)
    # in both Py2.x and Py3.x
    if responseStatus == "timeout":
        print("Update request " + token + " time out!")
    if responseStatus == "accepted":
        payloadDict = json.loads(payload)
        print("~~~~~~~~~~~~~~~~~~~~~~~")
        print("Update request with token: " + token + " accepted!")
        try:
            print("property: " + str(payloadDict["state"]["reported"]))
        except (Exception) as e:
                print("property: " + str(payloadDict["state"]["desired"]))
        print("~~~~~~~~~~~~~~~~~~~~~~~\n\n")
    if responseStatus == "rejected":
        print("Update request " + token + " rejected!")

# Usage
usageInfo = """Usage:

Use certificate based mutual authentication:
python medidor-iot-aws.py -e <endpoint> -r <rootCAFilePath> -c <certFilePath> -k <privateKeyFilePath>

Type "python medidor-iot-aws.py -h" for available options.
"""
# Help info
helpInfo = """-e, --endpoint
	Your AWS IoT custom endpoint
-r, --rootCA
	Root CA file path
-c, --cert
	Certificate file path
-k, --key
	Private key file path
-h, --help
	Help information
"""

# Read in command-line parameters

host = ""
rootCAPath = ""
certificatePath = ""
privateKeyPath = ""
try:
    opts, args = getopt.getopt(sys.argv[1:], "hwe:k:c:r:", ["help", "endpoint=", "key=","cert=","rootCA="])
    if len(opts) == 0:
        raise getopt.GetoptError("No input parameters!")
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print(helpInfo)
            exit(0)
        if opt in ("-e", "--endpoint"):
            host = arg
        if opt in ("-r", "--rootCA"):
            rootCAPath = arg
        if opt in ("-c", "--cert"):
            certificatePath = arg
        if opt in ("-k", "--key"):
            privateKeyPath = arg
except getopt.GetoptError:
    print(usageInfo)
    exit(1)
    
# Missing configuration notification
missingConfiguration = False
if not host:
    print("Missing '-e' or '--endpoint'")
    missingConfiguration = True
    if not rootCAPath:
        print("Missing '-r' or '--rootCA'")
        missingConfiguration = True
    if not certificatePath:
        print("Missing '-c' or '--cert'")
        missingConfiguration = True
    if not privateKeyPath:
        print("Missing '-k' or '--key'")
        missingConfiguration = True
    if missingConfiguration:
        exit(2)

# Configure logging
"""	
logger = logging.getLogger("AWSIoTPythonSDK.core")
logger.setLevel(logging.DEBUG)
streamHandler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
streamHandler.setFormatter(formatter)
logger.addHandler(streamHandler)
"""

# Custom MQTT message callback
def callbackLed(client, userdata, message):
    global led_status
    global already_notificated
    result = json.loads(message.payload)
    if(result["Consumo"] <= 0.1):
        #print "Led on"
        led_status = updateLed(True)
        already_notificated = True
    else:
        #print "Led off"
        led_status = updateLed(False)
        already_notificated = False

# Init AWSIoTMQTTShadowClient
myShadowClient = None
myShadowClient = AWSIoTMQTTShadowClient("medidor")
myShadowClient.configureEndpoint(host, 8883)
myShadowClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)

# Init AWSIoTMQTTClient
myAWSIoTMQTTClient = None
myAWSIoTMQTTClient = myShadowClient.getMQTTConnection()

# AWSIoTMQTTShadowClient connection configuration
myShadowClient.configureAutoReconnectBackoffTime(1, 32, 20)
myShadowClient.configureConnectDisconnectTimeout(10)  # 10 sec
myShadowClient.configureMQTTOperationTimeout(5)  # 5 sec

# AWSIoTMQTTClient connection configuration
myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
myAWSIoTMQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)  # 5 sec

# Connect and subscribe to AWS IoT
# Connect to AWS IoT
myShadowClient.connect()

# Create a deviceShadow with persistent subscription
myDeviceShadow = myShadowClient.createShadowHandlerWithName(thing_name, True)

myAWSIoTMQTTClient.subscribe(topic_led, 1, callbackLed)

# Start Shadow
ConsumoShadow = 0
payloadShadow = ('"Consumo": "{0:0.1f}", "Notificated": "{1}"'.format(ConsumoShadow, already_notificated))
payloadShadow = '{"state":{ "desired": {'+payloadShadow+'}}}'
myDeviceShadow.shadowUpdate(payloadShadow, customShadowCallback_Update, 5)

# Publish to a topic in a loop forever
try:
    while True:
        # Read Current
        ConsumoDC = calculaConsumo()
        # Publish temperature
        msg = ('"Consumo DC": "{0:0.01f}", "Notificated": "{1}"'.format(ConsumoDC, already_notificated))
        msg = '{'+msg+'}'
        myAWSIoTMQTTClient.publish(topic_consumo, msg, 1)
        # Update Shadow
        payloadShadow = ('"Consumo": "{0:0.1f}", "Notificated": "{1}"'.format(ConsumoDC, already_notificated))
        payloadShadow = '{"state":{ "reported": {'+payloadShadow+'}}}'
        myDeviceShadow.shadowUpdate(payloadShadow, customShadowCallback_Update, 5)
        time.sleep(delay_s)
except KeyboardInterrupt:
    pass
