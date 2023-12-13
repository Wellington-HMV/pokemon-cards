import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { CardComponent } from './components/card/card.component';
import { SideDeckComponent } from './components/side-deck/side-deck.component';
import { RouterModule } from '@angular/router';
import { DropdownBtnComponent } from './components/dropdown-btn/dropdown-btn.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoadingModule } from './components/loading/loading.module';
import { TableComponent } from './components/table/table.component';
import { ToastComponent } from './components/toast/toast.component';
import { NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    CardComponent,
    TopMenuComponent,
    SideDeckComponent,
    DropdownBtnComponent,
    DialogComponent,
    TableComponent,
    ToastComponent,
  ],
  imports: [CommonModule, RouterModule, LoadingModule, NgbToastModule, NgbTooltipModule],
  exports: [
    CardComponent,
    TopMenuComponent,
    SideDeckComponent,
    DropdownBtnComponent,
    DialogComponent,
    LoadingModule,
    TableComponent,
    ToastComponent,
    MaterialModule
  ],
})
export class CoreModule {}
