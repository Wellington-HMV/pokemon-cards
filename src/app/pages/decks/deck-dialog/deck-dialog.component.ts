import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService, DeckService, IDeck } from '@services';
import { Observable } from 'rxjs';
import { IStringArray } from 'src/app/models/string-array.model';
import { TypesTranslateEnum, Typesenum } from 'src/app/models/types.model';

export interface IConfigDeckDialog {
  title: string;
  btn1Text: string;
  btn2Text: string;
  deck?: IDeck;
  edit?: boolean;
}

@Component({
  selector: 'app-deck-dialog',
  templateUrl: './deck-dialog.component.html',
  styleUrls: ['./deck-dialog.component.scss'],
})
export class DeckDialogComponent implements OnInit {
  @Input() IConfigDeckDialog: IConfigDeckDialog;

  loading = false;

  TYPES = Typesenum;
  TYPESTRS = TypesTranslateEnum;

  form: FormGroup;

  types$ = new Observable<IStringArray>();

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private deckService: DeckService,
    private cardService: CardService
  ) {
    this.createForm();
    this.getTypes$();
  }

  ngOnInit(): void {
    if (this.IConfigDeckDialog?.edit) {
      this.setValuesForm();
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.IConfigDeckDialog.edit) {
      this.onEdit();
    } else {
      const id = this.deckService.post({ ...this.form.value, cards: [] });
      this.activeModal.close(id);
    }

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onEdit() {
    this.IConfigDeckDialog.deck = this.form.value;
    this.activeModal.close(this.IConfigDeckDialog.deck);
  }

  setValuesForm() {
    const { name, type } = this.form.controls;
    name.setValue(this.IConfigDeckDialog.deck.name);
    type.setValue(this.IConfigDeckDialog.deck.type);
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  getTypes$() {
    this.loading = true;
    this.types$ = this.cardService.getTypes();
    this.loading = false;
  }
}
