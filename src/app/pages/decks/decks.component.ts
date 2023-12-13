import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeckService, IDeck } from '@services';
import { ToastService } from 'src/app/core/components/toast/service/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeckDialogComponent } from './deck-dialog/deck-dialog.component';
import { Typesenum, TypesTranslateEnum } from 'src/app/models/types.model';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent {
  displayedColumns: string[] = ['type', 'name', 'cards', 'actions'];
  dataSource = new MatTableDataSource(this.deckService.get());

  TYPES = Typesenum;
  TYPESTRS = TypesTranslateEnum;

  constructor(
    private deckService: DeckService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private router: Router
  ) {}

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    const modalRef = this.modalService.open(DeckDialogComponent);
    modalRef.componentInstance.IConfigDeckDialog = {
      title: 'Criar deck',
      subTitle: 'Preencha os campos para seu deck',
      btn1Text: 'Voltar',
      btn2Text: 'Criar',
    };
    modalRef.closed.subscribe((id: number) => {
      if (id) this.navigate(id);
    });
  }

  navigate(id: number) {
    const modalRef = this.modalService.open(DialogComponent);
    modalRef.componentInstance.IConfigDialog = {
      title: 'Prosseguir',
      subTitle: 'Escolha se quer adicionar cartas ou ficar por aqui mesmo',
      btn2Text: 'Cartas',
      bodyTextOnly: `Você gostaria de ficar por aqui mesmo ??`,
      type: 'conditional',
    };
    modalRef.closed.subscribe((resp) => {
      if (resp === true) {
        this.router.navigate(['/cards', String(id)]);
      } else {
        this._getDescks();
      }
    });
  }

  onDelete(item: IDeck) {
    const modalRef = this.modalService.open(DialogComponent);
    modalRef.componentInstance.IConfigDialog = {
      title: 'Deletar deck',
      subTitle: 'Você está prestes a deletar um deck.',
      btn2Text: 'Deletar',
      bodyTextOnly: `Certeza que quer excluir o deck ${item.name} ??`,
      type: 'conditional',
    };
    modalRef.closed.subscribe((resp) => {
      if (resp === true) {
        this.deckService.delete(item);
        this._getDescks();
      }
    });
  }

  onEdit(item: IDeck) {
    this.router.navigate(['/cards', String(item.id)]);
  }

  _getDescks() {
    this.dataSource = new MatTableDataSource(this.deckService.get());
  }
}
