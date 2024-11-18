import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

import { BoardComponent } from './board.component';
import { CardComponent } from '../../components/card/card.component';
import { DescriptionComponent } from '../../components/description/description.component';
import { ButtonAction, KanbamAction } from '../../enum/actions.enum';
import { CardDTO } from '../../interfaces/card.model';
import { AuthService } from '../../services/auth.service';
import { BoardService } from '../../services/board.service';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  const card: CardDTO = {
    id: '1234',
    titulo: 'titulo',
    conteudo: 'conteudo',
    lista: KanbamAction.DOING
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        CardComponent,
        DescriptionComponent
      ],
      imports: [
        MatDividerModule,
        ReactiveFormsModule,
        MatIconModule
      ],
      providers: [
        AuthService,
        BoardService,
        provideHttpClient()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test action CREATE case', () => {
    const spyCreateCard = spyOn(component, 'createCard');
    component.action({ action: ButtonAction.CREATE, card });
    expect(spyCreateCard).toHaveBeenCalled();
  });

  it('should test action PUT case', () => {
    const spyUpdateCard = spyOn(component, 'updateCard');
    component.action({ action: ButtonAction.PUT, card });
    expect(spyUpdateCard).toHaveBeenCalled();
  });

  it('should test action DEL case', () => {
    const spyDeleteCard = spyOn(component, 'deleteCard');
    component.action({ action: ButtonAction.DEL, card });
    expect(spyDeleteCard).toHaveBeenCalled();
  });

  it('should test action NEXT case', () => {
    const spyUpdateCard = spyOn(component, 'updateCard');
    component.action({ action: ButtonAction.NEXT, card });
    expect(spyUpdateCard).toHaveBeenCalled();
  });

  it('should test action PREV case', () => {
    const spyUpdateCard = spyOn(component, 'updateCard');
    component.action({ action: ButtonAction.PREV, card });
    expect(spyUpdateCard).toHaveBeenCalled();
  });

  it('should test getColumnCards', () => {
    component.cards = [card];
    expect(component.getColumnCards(KanbamAction.DOING)).toEqual([card]);
  });

  it('should test nextStage NEXT and PREV case', () => {
    expect(component.nextStage(ButtonAction.PREV, KanbamAction.DOING)).toEqual(KanbamAction.TO_DO);
    expect(component.nextStage(ButtonAction.NEXT, KanbamAction.DOING)).toEqual(KanbamAction.DONE);
  });

  it('should test onInit', () => {
    const spyGetCards = spyOn(component, 'getCards');
    component.ngOnInit();
    expect(spyGetCards).toHaveBeenCalled();
  });

  it('should test getCards', () => {
    const spyGetCards = spyOn(component['boardService'], 'getCards');
    spyGetCards.and.returnValue(of([card]));
    component.getCards();
    expect(component.cards).toEqual([card]);
  });

  it('should test createCard', () => {
    const spyGetCards = spyOn(component, 'getCards');
    const spySaveCard = spyOn(component['boardService'], 'saveCard');
    spySaveCard.and.returnValue(of(card));
    component.createCard(card);
    expect(spyGetCards).toHaveBeenCalled();
  });

  it('should test updateCard', () => {
    const spyGetCards = spyOn(component, 'getCards');
    const spyUpdateCard = spyOn(component['boardService'], 'updateCard');
    spyUpdateCard.and.returnValue(of(card));
    component.updateCard(card);
    expect(spyGetCards).toHaveBeenCalled();
  });

  it('should test deleteCard', () => {
    const spyDeleteCard = spyOn(component['boardService'], 'deleteCard');
    spyDeleteCard.and.returnValue(of([card]));
    component.deleteCard(card);
    expect(component.cards).toEqual([card]);
  });
});
