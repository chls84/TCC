export class Content{

    private consumo: string = '0';
    
    constructor(consumo : string)
	{		
        this.consumo = consumo;
    }

	public get $consumo(): string  {
		return this.consumo;
	}

	public set $consumo(value: string ) {
		this.consumo = value;
	}
}