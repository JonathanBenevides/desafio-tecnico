import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subject, throwError } from 'rxjs';

import { authInterceptor } from './auth.interceptor';
import { ProgressBarService } from '../services/progress-bar.service';

describe('authInterceptor', () => {
  let snackbar: jasmine.SpyObj<MatSnackBar>;
  const defaultConfig = { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' };
  let spySnackBarOpen: jasmine.Spy;

  const interceptor: HttpInterceptorFn = (req, next) => TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [ProgressBarService]
    });
    snackbar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  }));

  beforeEach(() => {
    spySnackBarOpen = spyOn(snackbar, 'open');
  });

  describe('Should test successHandler', () => {
    const event: HttpEvent<any> = { type: 4 } as HttpEvent<HttpResponse<any>>;
    let observable: Subject<any>;

    beforeEach(() => {
      observable = new Subject<any>();
    });

    it('when method is POST', () => {
      interceptor(new HttpRequest('POST', '', {}), () => observable).subscribe();
      observable.next(event);
      expect(spySnackBarOpen).toHaveBeenCalledWith('Salvo com sucesso!', undefined, { ...defaultConfig, panelClass: 'snackbar-success' });
    });

    it('when method is PUT', () => {
      interceptor(new HttpRequest('PUT', '', {}), () => observable).subscribe();
      observable.next(event);
      expect(spySnackBarOpen).toHaveBeenCalledWith('Atualizado com sucesso!', undefined, { ...defaultConfig, panelClass: 'snackbar-success' });
    });

    it('when method is DELETE', () => {
      const res = new HttpResponse({status: 200});
      interceptor(new HttpRequest('DELETE', '', {}), () => observable).subscribe();
      observable.next(res);
      expect(spySnackBarOpen).toHaveBeenCalledWith('Removido com sucesso!', undefined, { ...defaultConfig, panelClass: 'snackbar-success' });
    });
  });

  function error(status: number): Observable<never> {
    return throwError(() => new HttpErrorResponse({status, error: {message: 'my custom message here'}}));
  }

  describe('Should test serverSideErrorHandler', () => {
    it('when errorOnServerSide is true', fakeAsync(() => {
      const event: HttpEvent<any> = { type: 4, status: 500 } as HttpEvent<HttpResponse<any>>;
      const observable: Subject<any> = new Subject<any>();
      interceptor(new HttpRequest('DELETE', '', {}), () => error(500)).subscribe();
      observable.next(event);
      expect(spySnackBarOpen).toHaveBeenCalledWith('Tente novamente mais tarde...', undefined, { ...defaultConfig, panelClass: 'snackbar-error' });
    }));
  });

  describe('Should test clientSideErrorHandler', () => {
    it('when errorOnServerSide is true and event code is 400', () => {
      interceptor(new HttpRequest('POST', '', {}), () => error(400)).subscribe();
      expect(spySnackBarOpen).toHaveBeenCalledWith('Revise os dados.', undefined, { ...defaultConfig, panelClass: 'snackbar-error' });
    });

    it('when errorOnServerSide is true and event code is 401', () => {
      interceptor(new HttpRequest('POST', '', {}), () => error(401)).subscribe();
      expect(spySnackBarOpen).toHaveBeenCalledWith('Ação não autorizado.', undefined, { ...defaultConfig, panelClass: 'snackbar-error' });
    });

    it('when errorOnServerSide is true and event code is 403', () => {
      interceptor(new HttpRequest('POST', '', {}), () => error(403)).subscribe();
      expect(spySnackBarOpen).toHaveBeenCalledWith('Ação proibida.', undefined, { ...defaultConfig, panelClass: 'snackbar-error' });
    });

    it('when errorOnServerSide is true and event code is 404', () => {
      interceptor(new HttpRequest('POST', '', {}), () => error(404)).subscribe();
      expect(spySnackBarOpen).toHaveBeenCalledWith('Não encontrado.', undefined, { ...defaultConfig, panelClass: 'snackbar-error' });
    });

    it('when errorOnServerSide is true and event code is other the the above one', () => {
      interceptor(new HttpRequest('POST', '', {}), () => error(402)).subscribe();
      expect(spySnackBarOpen).toHaveBeenCalledWith('Tente novamente mais tarde...', undefined, { ...defaultConfig, panelClass: 'snackbar-error' });
    });
  });
});
