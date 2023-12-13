import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { DecksComponent } from './decks.component';
import { DeckDialogComponent } from './deck-dialog/deck-dialog.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DecksComponent, DeckDialogComponent],
  exports: [DecksComponent, DeckDialogComponent],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule
  ],
})
export class DecksModule {}
