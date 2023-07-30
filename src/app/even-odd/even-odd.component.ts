import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-even-odd',
  templateUrl: './even-odd.component.html',
  styleUrls: ['./even-odd.component.css']
})
export class EvenOddComponent implements OnInit {

  numberForm!: FormGroup; // Use the non-null assertion operator

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.numberForm = this.formBuilder.group({
      number: [null]
    });
  }

  isEven(): boolean {
    const number = this.numberForm.get('number')?.value; // Add a conditional check using the "?" operator
    return number % 2 === 0;
  }
}
