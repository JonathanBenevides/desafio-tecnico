import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProgressBarService {
  public showProgressBar$: Subject<boolean> = new Subject();
}
