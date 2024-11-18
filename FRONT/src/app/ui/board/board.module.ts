import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardComponent } from './board.component';
import { CardModule } from '../../components/card/card.module';
import { BoardService } from '../../services/board.service';

export const routes: Routes = [
  {
      path: '',
      component: BoardComponent
  }
];

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule
  ],
  providers: [BoardService]
})
export class BoardModule { }
