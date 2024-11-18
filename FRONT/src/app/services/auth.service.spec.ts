import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test login', (done: DoneFn) => {
    const res = '1234';
    const payload = { login: '', senha: '' };
    httpClientSpy.post.and.returnValue(of(res));
    service.login(payload).subscribe({
      next: (res) => {
        expect(res).toEqual(res);
        done();
      },
      error: done.fail,
    });
  });
});
