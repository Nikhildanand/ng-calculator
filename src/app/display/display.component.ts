import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  private tempTextContent = '';
  @Input()
  get textContent(): string { return this.tempTextContent; }
  set textContent(textContent: string) {
    this.tempTextContent = textContent || '';
  }
  constructor() { }

  ngOnInit(): void {
  }

}
