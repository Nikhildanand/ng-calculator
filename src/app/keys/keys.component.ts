import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

interface Params {
  key: string;
  type: string;
}

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})

export class KeysComponent implements OnInit {
  @Output() getKeyPress = new EventEmitter<Params>();
  operators: string[] = ['+', '-', '*', '/'];
  numbers: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  specialKeys: string[] = ['.', 'AC'];
  isDepressedClass = false;

  ngOnInit(): void {
  }

  @HostListener('window:keyup', ['$event'])
  keyboardPress(event: KeyboardEvent): void {
    const key: string = event.key;
    if (key === 'Enter' || key === '=') {
      this.calculate();
    }
    else if (key === 'c') {
      this.clearKeyPress();
    }
    else if (!isNaN(+key)) {
      this.keyPress(key);
    }
    else if (this.operators.includes(key)) {
      this.operatorKeyPress(key);
    }
  }

  operatorKeyPress(key: string) {
    this.isDepressedClass = true;
    this.getKeyPress.emit({ key, type: 'operator' });
  }

  keyPress(key: string): void {
    this.isDepressedClass = false;
    this.getKeyPress.emit({ key, type: 'operand' });
  }

  calculate(): void {
    this.getKeyPress.emit({ key: '=', type: 'result' });
  }

  clearKeyPress(): void {
    this.getKeyPress.emit({ key: 'c', type: 'clear' });
  }

}
