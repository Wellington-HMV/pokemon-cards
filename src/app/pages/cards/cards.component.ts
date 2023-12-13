import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService, DeckService, IDeck } from '@services';
import { Observable, Subscription } from 'rxjs';
import { IApiResponseCards, ICard } from 'src/app/models/card.model';
import { CardsDialogComponent } from './cards-dialog/cards-dialog.component';
import { rubberBandOnEnterAnimation } from 'angular-animations';
import { ToastService } from 'src/app/core/components/toast/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cards-page',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [rubberBandOnEnterAnimation({ duration: 3000 })],
})
export class CardsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  cards$ = new Observable<{ data: ICard[] }>();
  cardsDeck$ = new Observable<ICard[]>();
  deck$: IDeck;
  loading = false;
  tableView = false;

  sub = new Subscription();

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100, 250];

  pageEvent: PageEvent;
  loadingCards: boolean;

  constructor(
    private cardService: CardService,
    private deckService: DeckService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    public _MatPaginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit(): void {
    const deckId = this.route.snapshot.paramMap.get('id');

    this.deck$ = this.deckService.getById(Number(deckId));
    this.cardsDeck$ = new Observable((obs) => obs.next(this.deck$.cards));

    this._getCards();

    this._MatPaginatorIntl.firstPageLabel = 'Primeira página';
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por página';
    this._MatPaginatorIntl.lastPageLabel = 'Ultima página';
    this._MatPaginatorIntl.nextPageLabel = 'Próxima';
    this._MatPaginatorIntl.previousPageLabel = 'Anterior'; 
  }

  onActionCardsDeck(event: any) {
    if (this.deck$.cards.length > 0 && this.deck$.cards.length < 24) {
      this.toastService.show(
        'danger',
        `Não foi possível salvar deck`,
        `A quantidade de cartas deve ser 24 cartas ao menos! Você adicionou apenas ${this.deck$.cards.length}`,
        4000
      );
      return;
    }

    if (event) {
      this.loading = true;
      this.deckService.update(this.deck$);
      setTimeout(() => {
        this.loading = false;
        this.onSubmit();
      }, 1000);
    } else {
      this.onSubmit();
    }
  }

  onSubmit() {
    this.router.navigate(['/decks']);
  }

  selectCard(card: ICard) {
    const modalRef = this.modalService.open(CardsDialogComponent);
    modalRef.componentInstance.IConfigDialog = {
      card,
      title: 'Adicionar carta',
      subTitle: card.name,
      btn2Text: 'Adicionar',
    };
    modalRef.closed.subscribe((card) => {
      if (card) {
        this.rolesAddCard(card);
      }
    });
  }

  removeCard(card: ICard, index: number) {
    const modalRef = this.modalService.open(CardsDialogComponent);
    modalRef.componentInstance.IConfigDialog = {
      card,
      title: 'Remover carta',
      subTitle: card.name,
      btn2Text: 'Remover',
    };
    modalRef.closed.subscribe((card) => {
      if (!!card && !!index) {
        this.loading = true;
        this.deck$ = this.deckService.deleteCard(index - 1, this.deck$);
        setTimeout(() => (this.loading = false), 450);
      }
    });
  }

  private rolesAddCard(card: ICard) {
    this.sub.add(
      this.cardsDeck$.subscribe((data) => {
        const inludedCard = data.filter((c) => c.name === card.name);
        if (inludedCard.length < 4 && data.length < 60) {
          this.toastService.show(
            'success',
            `Adicionada ${card.name}`,
            `${data.length + 1}/60 Cartas \n Limite de cartas atingido!`,
            6000
          );
          this.loading = true;
          this.deck$ = this.deckService.postCard(card, this.deck$);
          setTimeout(() => (this.loading = false), 450);
        } else {
          if (inludedCard.length === 4) {
            this.toastService.show(
              'danger',
              'Não conseguimos adicionar a carta!',
              ' 4/4 Cartas \n Esta carta não pode mais ser adicionada no deck!',
              6000
            );
          } else {
            this.toastService.show(
              'danger',
              'Não conseguimos adicionar a carta!',
              '60/60 Cartas \n Limite de cartas atingido!',
              6000
            );
          }
        }
      })
    );
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this._getCards();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  _getCards() {
    this.loadingCards = true;
    this.cardService.get(this.pageIndex, this.pageSize).subscribe({
      next: (response: IApiResponseCards) => {
        const { data, count, pageSize, page, totalCount } = response;

        this.cards$ = new Observable((obs) => obs.next({ data: data }));

        this.length = totalCount;
        this.pageSize = pageSize;
        this.pageIndex = page;
      },
      complete: () => {
        this.loadingCards = false;
        this.ref.detectChanges();
      },
    });
  }
}
