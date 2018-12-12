import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { NotificationModule } from './notification.module';

export enum NotificationType {
  error = 0,
  success = 1,
  warning = 2,
}

export const WINDOW_WIDTH_XS = 768;

@Injectable({
  providedIn: NotificationModule,
})
export class NotificationService {
  public constructor(private snackbar: MatSnackBar) {}

  public showNotification(text: string, type: NotificationType): void {
    const horizontalPosition: MatSnackBarHorizontalPosition = window.innerWidth < WINDOW_WIDTH_XS ? 'center' : 'right';
    const verticalPosition: MatSnackBarVerticalPosition = window.innerWidth < WINDOW_WIDTH_XS ? 'bottom' : 'top';

    const baseConfig: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition,
      verticalPosition,
    };
console.log(text);
    if (type === NotificationType.success) {
      this.snackbar.open(text, 'x', {
        ...baseConfig,
        panelClass: ['snackbar-success'],
      });
    } else if (type === NotificationType.error) {
      this.snackbar.open(text, 'x', {
        ...baseConfig,
        panelClass: ['snackbar-error'],
      });
    } else if (type === NotificationType.warning) {
      this.snackbar.open(text, 'x', {
        ...baseConfig,
        panelClass: ['snackbar-warning'],
      });
    }
  }
}
