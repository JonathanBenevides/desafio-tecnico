import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from './api';

@Injectable()
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  public login(payload: { login: string, senha: string }): Observable<string> {
    return this.http.post<string>(`${API}/login`, payload);
  }
}
