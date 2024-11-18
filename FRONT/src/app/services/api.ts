import { isDevMode } from '@angular/core';

export const API = isDevMode() ? 'http://localhost:5000' : '';
