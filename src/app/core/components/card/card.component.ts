import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Typesenum } from 'src/app/models/types.model';
import { rubberBandOnEnterAnimation } from 'angular-animations';

interface ICardInput {
  title: string;
  image: string;
  supertype: string;
  types: Typesenum[];
}

interface IimageConfig {
  width: string;
  height: string;
}

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [rubberBandOnEnterAnimation({ duration: 3000 })],
})
export class CardComponent {
  @Input() ICardInput!: ICardInput;

  @Input() IimageConfig: IimageConfig = { width: '250px', height: '350px' };

  @Output() Selected = new EventEmitter();
  @Output() Selected2 = new EventEmitter();

  TYPES = Typesenum;

  returntypeSrc(type: string) {
    return this.TYPES[type];
  }

  selected() {
    console.log('card emit');
    console.log(this.ICardInput);
    this.Selected.emit();
  }
}
