import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from './api';
import { CardDTO } from '../interfaces/card.model';

@Injectable()
export class BoardService {

  constructor(private readonly http: HttpClient) { }

  public getCards(): Observable<CardDTO[]> {
    return this.http.get<CardDTO[]>(`${API}/cards`);
  }

  public saveCard(payload: CardDTO): Observable<CardDTO> {
    return this.http.post<CardDTO>(`${API}/cards`, payload);
  }

  public updateCard(payload: CardDTO): Observable<CardDTO> {
    return this.http.put<CardDTO>(`${API}/cards/${payload.id}`, payload);
  }

  public deleteCard(id: string): Observable<CardDTO[]> {
    return this.http.delete<CardDTO[]>(`${API}/cards/${id}`);
  }
}
