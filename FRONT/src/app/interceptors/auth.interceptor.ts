import { HttpEvent, HttpEventType, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

import { HttpMethod } from '../enum/http-method.enum';
import { ProgressBarService } from '../services/progress-bar.service';

const token = sessionStorage.getItem('token');
const defaultConfig = { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' } as MatSnackBarConfig;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _snackBar = inject(MatSnackBar);
  const _progressbar = inject(ProgressBarService);
  _progressbar.showProgressBar$.next(true);
  const newReq = req.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } });
  return next(newReq).pipe(
    tap((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.Response) {
        _progressbar.showProgressBar$.next(false);
        const errorOnClientSide = event.status >= HttpStatusCode.BadRequest && event.status < HttpStatusCode.InternalServerError;
        const errorOnServerSide = event.status >= HttpStatusCode.InternalServerError || event.status === 0;
        if (errorOnClientSide) {
          clientSideErrorHandler(event.status, _snackBar);
          return;
        }
        if (errorOnServerSide) {
          serverSideErrorHandler(_snackBar);
          return;
        }
        if (!req.url.includes('login')) {
          successHandler(req.method, _snackBar);
        }
      }
    })
  );
};

function clientSideErrorHandler(eventStatus: HttpStatusCode, _snackBar: MatSnackBar): void {
  const errorDefaultConfig = { ...defaultConfig, panelClass: 'snackbar-error' };
  switch (eventStatus) {
    case HttpStatusCode.BadRequest:
      _snackBar.open('Revise os dados.', undefined, errorDefaultConfig);
      break;
    case HttpStatusCode.Unauthorized:
      _snackBar.open('Ação não autorizado.', undefined, errorDefaultConfig);
      break;
    case HttpStatusCode.Forbidden:
      _snackBar.open('Ação proibida.', undefined, errorDefaultConfig);
      break;
    case HttpStatusCode.NotFound:
      _snackBar.open('Não encontrado.', undefined, errorDefaultConfig);
      break;
    default:
      _snackBar.open('Tente novamente mais tarde...', undefined, errorDefaultConfig);
      break;
  }
}

function serverSideErrorHandler(_snackBar: MatSnackBar): void {
  _snackBar.open('Tente novamente mais tarde...', undefined, { ...defaultConfig, panelClass: 'snackbar-error' });
}

function successHandler(method: string | HttpMethod, _snackBar: MatSnackBar) {
  const showSnackBar =
    method === HttpMethod.POST ||
    method === HttpMethod.PUT ||
    method === HttpMethod.DELETE;
  const message =
    method === HttpMethod.POST ? 'Salvo com sucesso!' :
      method === HttpMethod.PUT ? 'Atualizado com sucesso!' :
        method === HttpMethod.DELETE ? 'Removido com sucesso!' :
          ''
  if (showSnackBar) {
    _snackBar.open(message, undefined, { ...defaultConfig, panelClass: 'snackbar-success' });
  }
}
