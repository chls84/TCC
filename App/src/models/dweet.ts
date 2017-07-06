import {With} from '../models/with';

export class Dweet{
    private this_ : string;
    private by_ : string;
    private the_ : string;
    private with_ : Array<With>;

	constructor($this_: string, $by_: string, $the_: string, $with_: Array<With>) {
		this.this_ = $this_;
		this.by_ = $by_;
		this.the_ = $the_;
		this.with_ = $with_;
	}    

	public get $this_(): string {
		return this.this_;
	}

	public set $this_(value: string) {
		this.this_ = value;
	}    

	public get $by_(): string {
		return this.by_;
	}

	public set $by_(value: string) {
		this.by_ = value;
	}   

	public get $the_(): string {
		return this.the_;
	}

	public set $the_(value: string) {
		this.the_ = value;
	}    

	public get $with_(): Array<With> {
		return this.with_;
	}

	public set $with_(value: Array<With>) {
		this.with_ = value;
	}    
}