import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast/service/toast.service';

interface IConfigDialog {
  title?: string;
  subTitle?: string;
  btn1Text?: string;
  btn2Text?: string;
  bodyTextOnly?: string;
  type?: 'conditional';
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() IConfigDialog: IConfigDialog;
  @Input() disable: boolean;
  @Output() accept = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastService
  ) {
    this.toastService.show(
      'info',
      `FACILIDADE DE AÇÃO`,
      `Precione a tecla "F2" do seu teclado e sua ação será aceita! ou se preferir pode clicar no botão do lado direito no rodapé da caixinha que está vendo! Obrigado espero ter ajudado!`,
      15000
    );
  }

  onConfirm() {
    if (this.IConfigDialog.type === 'conditional') {
      this.activeModal.close(true);
    } else {
      this.accept.emit(true);
    }
  }

  keyUpPress($event: KeyboardEvent) {
    if ($event.key === 'F2' && !this.disable) this.onConfirm();
  }
}
