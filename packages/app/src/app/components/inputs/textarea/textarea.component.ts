import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  static TextareaComponentCounter = 0;
  @Input() label = '[LABEL]';
  @Input() form: FormGroup;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() autocomplete = 'off';
  @Input() name: string;
  @Input() list: string[];
  @Input() controlName: string;
  @Input() group: FormGroup;
  forId = 'input-textarea-' + TextareaComponent.TextareaComponentCounter;
  listId = 'input-textarea-list-' + TextareaComponent.TextareaComponentCounter;
  faAsterisk = faAsterisk;

  constructor() {
    TextareaComponent.TextareaComponentCounter++;
  }

  ngOnInit(): void {
  }

}
