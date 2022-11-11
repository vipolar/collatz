import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

	constructor() { }

	@Output() inputConfirmed = new EventEmitter();
	inputMessage: string = "";
	inputValue: string = "";
	ngOnInit(): void { }

	inputConfirm(stringSeed: string) {
		// Matches any string containing an integer (negatives included)(hopefully!)
		const pattern: RegExp = new RegExp('^([-+](?=[1-9])|[1-9])[0-9]*$');		

		if (pattern.test(stringSeed)) { 
			this.inputMessage = "Valid input!";
		} else {
			this.inputMessage = "invalid input!";
			return;
		}

		//TODO: more pattern matching!!!
		let bigSeed: bigint = BigInt(stringSeed);
		this.inputConfirmed.emit(bigSeed);
	}
}
