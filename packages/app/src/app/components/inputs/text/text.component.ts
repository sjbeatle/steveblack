import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  static TextComponentCounter = 0;
  @Input() label = '[LABEL]';
  @Input() form: FormGroup;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() autocomplete = 'off';
  @Input() name: string;
  @Input() list: string[];
  @Input() controlName: string;
  @Input() group: FormGroup;
  forId = 'input-text-' + TextComponent.TextComponentCounter;
  listId = 'input-text-list-' + TextComponent.TextComponentCounter;
  faAsterisk = faAsterisk;

  constructor() {
    TextComponent.TextComponentCounter++;
  }

  ngOnInit(): void {
  }

}
