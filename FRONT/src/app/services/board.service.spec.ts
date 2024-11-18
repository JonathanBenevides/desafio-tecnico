import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { BoardService } from './board.service';
import { KanbamAction } from '../enum/actions.enum';
import { CardDTO } from '../interfaces/card.model';

describe('BoardService', () => {
  let service: BoardService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const card: CardDTO = {
    id: '1234',
    titulo: 'titulo',
    conteudo: 'conteudo',
    lista: KanbamAction.DOING
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);
    service = new BoardService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getCards', (done: DoneFn) => {
    const res: CardDTO[] = [card];
    httpClientSpy.get.and.returnValue(of(res));
    service.getCards().subscribe({
      next: (res) => {
        expect(res).toEqual(res);
        done();
      },
      error: done.fail
    });
  });

  it('should test saveCard', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(card));
    service.saveCard(card).subscribe({
      next: (res) => {
        expect(res).toEqual(res);
        done();
      },
      error: done.fail
    });
  });

  it('should test updateCard', (done: DoneFn) => {
    httpClientSpy.put.and.returnValue(of(card));
    service.updateCard(card).subscribe({
      next: (res) => {
        expect(res).toEqual(res);
        done();
      },
      error: done.fail
    });
  });

  it('should test deleteCard', (done: DoneFn) => {
    const res: CardDTO[] = [card];
    httpClientSpy.delete.and.returnValue(of(res));
    service.deleteCard('1234').subscribe({
      next: (res) => {
        expect(res).toEqual(res);
        done();
      },
      error: done.fail
    });
  });
});
