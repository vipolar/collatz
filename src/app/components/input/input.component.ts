import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor() { }

  rExp: RegExp = new RegExp('^[0-9]+$');
  inputMessage: string = "";
  inputValue: string = "";

  ngOnInit(): void {
  }

  onClickMe() {
    if (this.rExp.test(this.inputValue)) {
      let number = +this.inputValue;
      this.inputMessage = "";
      
      while (number != 1) {
        if (number % 2 != 0) {
          number = (number * 3) + 1;
        } else {
          number = number / 2;
        }
        console.log(number);
      }
    } else {
      this.inputMessage = "invalid input!";
    }
  }
}
