import { Component, Input } from '@angular/core';
import { ICard } from 'src/app/models/card.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() data: ICard[] = [];
}
