import { Component, OnInit } from '@angular/core';

import { ButtonAction, KanbamAction } from '../../enum/actions.enum';
import { CardDTO } from '../../interfaces/card.model';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  public cards: CardDTO[] = [];
  public readonly newStage = KanbamAction.NEW;
  public readonly stages: KanbamAction[] = [
    KanbamAction.TO_DO,
    KanbamAction.DOING,
    KanbamAction.DONE
  ];
  public readonly stageTitles: string[] = [
    'To Do',
    'Doing',
    'Done'
  ];

  constructor(private readonly boardService: BoardService) { }

  public action(event: { action: ButtonAction, card: CardDTO }): void {
    switch (event.action) {
      case ButtonAction.CREATE:
        this.createCard(event.card);
        break;
      case ButtonAction.PUT:
        this.updateCard(event.card);
        break;
      case ButtonAction.DEL:
        this.deleteCard(event.card);
        break;
      case ButtonAction.NEXT:
      case ButtonAction.PREV:
        this.updateCard({ ...event.card, lista: this.nextStage(event.action, event.card.lista) });
        break;
    }
  }

  public getColumnCards(stage: KanbamAction): CardDTO[] {
    return this.cards.filter((card: CardDTO) => card.lista.toLowerCase() === stage.replace(' ', '').toLocaleLowerCase());
  }

  public nextStage(action: ButtonAction, current: KanbamAction): KanbamAction {
    const index = this.stages.findIndex((stage: KanbamAction) => stage === current);
    let nextStage = null;
    switch (action) {
      case ButtonAction.NEXT:
        nextStage = this.stages[index + 1];
        break;
      case ButtonAction.PREV:
        nextStage = this.stages[index - 1];
        break;
    }
    return nextStage as KanbamAction;
  }

  public ngOnInit(): void {
    this.getCards();
  }

  public getCards(): void {
    this.boardService.getCards().subscribe((cards: CardDTO[]) => this.cards = cards);
  }

  public createCard(card: CardDTO): void {
    this.boardService.saveCard(card).subscribe(() => this.getCards());
  }

  public updateCard(card: CardDTO): void {
    this.boardService.updateCard(card).subscribe(() => this.getCards());
  }

  public deleteCard(card: CardDTO): void {
    this.boardService.deleteCard(card.id!).subscribe((cards: CardDTO[]) => this.cards = cards);
  }
}
