import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICard } from 'src/app/models/card.model';
import { Typesenum } from 'src/app/models/types.model';

interface IConfigDialog {
  title: string;
  card: ICard;
  btn1Text: string;
  btn2Text: string;
}

@Component({
  selector: 'app-cards-dialog',
  templateUrl: './cards-dialog.component.html',
  styleUrls: ['./cards-dialog.component.scss'],
})
export class CardsDialogComponent {
  @Input() IConfigDialog: IConfigDialog;

  TYPES = Typesenum;

  constructor(private activeModal: NgbActiveModal) {}

  onSubmit() {
    this.activeModal.close(this.IConfigDialog.card);
  }
}
