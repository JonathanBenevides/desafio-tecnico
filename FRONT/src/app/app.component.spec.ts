import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { ProgressBarService } from './services/progress-bar.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterModule,
        MatProgressBarModule
      ],
      providers: [
        AuthService,
        ProgressBarService,
        provideHttpClient()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test onInit', () => {
    component.showProgressBar = false;
    const token = 'dwalmnuduaia';
    const spyLogin = spyOn(component['authService'], 'login');
    const spyDetectChanges = spyOn(component['cdr'], 'detectChanges');
    spyLogin.and.returnValue(of(token));
    component.ngOnInit();
    component['progressBarService'].showProgressBar$.next(true);
    expect(sessionStorage.getItem('token')).toBe(token);
    expect(component.showProgressBar).toBe(true);
    expect(spyDetectChanges).toHaveBeenCalled();
  });

  it('should test ngOnDestroy', () => {
    const spyNext = spyOn(component['ngUnsubscribe$'], 'next');
    const spyComplete = spyOn(component['ngUnsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
