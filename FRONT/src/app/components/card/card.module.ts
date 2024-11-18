import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgxEditorModule } from 'ngx-editor';

import { CardComponent } from './card.component';
import { DescriptionComponent } from '../description/description.component';

@NgModule({
  declarations: [
    CardComponent,
    DescriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MatIconModule,
    MatDividerModule,
    MatRippleModule
  ],
  exports: [CardComponent]
})
export class CardModule { }
