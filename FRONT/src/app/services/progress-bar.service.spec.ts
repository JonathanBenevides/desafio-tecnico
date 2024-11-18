import { ProgressBarService } from './progress-bar.service';

describe('ProgressBarService', () => {
  let service: ProgressBarService;

  beforeEach(() => {
    service = new ProgressBarService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
