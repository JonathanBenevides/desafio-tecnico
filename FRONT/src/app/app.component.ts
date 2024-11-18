import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from './services/auth.service';
import { ProgressBarService } from './services/progress-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  public showProgressBar: boolean = false;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly progressBarService: ProgressBarService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.authService
      .login({ login: 'letscode', senha: 'lets@123' })
      .subscribe((token: string) => sessionStorage.setItem('token', token));
    this.progressBarService.showProgressBar$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value: boolean) => {
        this.showProgressBar = value;
        this.cdr.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
