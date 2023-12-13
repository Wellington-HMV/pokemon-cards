import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IDropDown } from '../dropdown-btn/dropdown-btn.component';
import { IDeck } from '@services';
import { Typesenum, TypesTranslateEnum } from 'src/app/models/types.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeckDialogComponent } from 'src/app/pages/decks/deck-dialog/deck-dialog.component';

@Component({
  selector: 'app-side-deck',
  templateUrl: './side-deck.component.html',
  styleUrls: ['./side-deck.component.scss'],
})
export class SideDeckComponent implements AfterContentChecked {
  @Input() deck: IDeck;
  @Input() loading: boolean;
  @Output() actionSelected = new EventEmitter();

  TYPES = Typesenum;
  TYPESTRS = TypesTranslateEnum;

  configMenuDeck: IDropDown = {
    icon: 'menu',
    options: [
      { name: 'Salvar', type: 'accept' },
      { name: 'Cancelar', type: 'cancel' },
    ] as any,
  };

  constructor(private ref: ChangeDetectorRef, private modalService: NgbModal) {}
  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onAction(value: IDropDown | boolean) {
    this.actionSelected.emit(value);
  }

  onCountSuperType(type: string, value: 'Energy' | 'Pokémon' | 'Trainer') {
    return this.deck.cards.filter((f) => f[type] === value).length ?? 0;
  }

  onCountTypes() {
    return [...new Set(this.deck.cards.map((m) => m.types).flat())].length;
  }

  onEditDeck() {
    const modalRef = this.modalService.open(DeckDialogComponent);
    modalRef.componentInstance.IConfigDeckDialog = {
      title: 'Editar deck',
      subTitle: 'Altere os campos do seu deck',
      btn1Text: 'Voltar',
      btn2Text: 'Salvar',
      edit:true,
      deck:this.deck
    };
    modalRef.closed.subscribe((deck: IDeck) => {
      if (deck) {
        this.deck.name = deck.name;
        this.deck.type = deck.type;
      }
    });
  }
}
