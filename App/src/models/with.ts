import {Content} from '../models/content';

export class With{
    private thing : string;
    private created : string;
    private content : Content;
    private date : string;
    private time : string;

	constructor($thing: string, $created: string, $content: Content, $date: string, $time: string) {
		this.thing = $thing;
		this.created = $created;
		this.content = $content;
		this.date = $date;
		this.time = $time;
	}
    
	public get $thing(): string {
		return this.thing;
	}

	public set $thing(value: string) {
		this.thing = value;
	}

	public get $content(): Content {
		return this.content;
	}

	public set $content(value: Content) {
		this.content = value;
	}

	public get $time(): string {
		return this.time;
	}

	public set $time(value: string) {
		this.time = value;
	}

	public get $created(): string {
		return this.created;
	}

	public set $created(value: string) {
		this.created = value;
	}

	public get $date(): string {
		return this.date;
	}

	public set $date(value: string) {
		this.date = value;
	}    
}