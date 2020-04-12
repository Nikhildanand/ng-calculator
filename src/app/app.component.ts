import { Component } from '@angular/core';

export enum STATES {
  CLEAR = 'clear',
  OPERAND = 'operand',
  OPERATOR = 'operator',
  RESULT = 'result'
}

interface KeyPressParams {
  key: string;
  type: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  output: string;
  previousState: string = STATES.CLEAR;
  firstOperand = 0;
  secondOperand = 0;
  operator = '+';
  constructor() {
    this.output = '0';
  }

  createString(key: string) {
    if (this.previousState === STATES.OPERATOR) {
      this.firstOperand = +this.output;
      this.secondOperand = 0;
      this.output = String(key);
    }
    else {
      const outputNumber = +key;
      if (!isNaN(outputNumber)) {
        // Concat numbers if displayed number is not 0
        if (this.output !== '0') {
          this.output += key;
        }
        // Replace 0 if displayed number is 0
        else if (this.output === '0') {
          this.output = String(key);
        }
      }
      if (key === '.') {
        this.output += key;
      }
    }
    this.secondOperand = +this.output;
  }

  calculate(): void {
    switch (this.operator) {
      case '+': this.output = String(this.firstOperand + this.secondOperand);
                break;
      case '-': this.output = String(this.firstOperand - this.secondOperand);
                break;
      case '*': this.output = String(this.firstOperand * this.secondOperand);
                break;
      case '/': this.output = String(this.firstOperand / this.secondOperand);
                break;
      default: this.output = String(this.firstOperand + this.secondOperand);
    }
  }

  reset(): void {
    this.output = '0';
    this.firstOperand = 0;
    this.secondOperand = 0;
  }

  showResult(): void {
    this.calculate();
    this.firstOperand = +this.output;
    this.secondOperand = 0;
  }

  operation(key: string): void {
    if (this.previousState === STATES.RESULT) {
      this.operator = '+';
    }
    this.calculate();
    this.operator = key;
  }

  getOutputValue(keyPressParams: KeyPressParams): void {
    const { key, type } = keyPressParams;
    switch (type) {
      case STATES.OPERAND:  this.createString(key);
                            break;
      case STATES.OPERATOR: this.operation(key);
                            break;
      case STATES.CLEAR:    this.reset();
                            break;
      case STATES.RESULT:   this.showResult();

    }
    this.previousState = type;
  }
}
