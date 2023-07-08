import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notificationDuration } from 'src/app/shared/enums/notificationTimeDuration';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  // Open success message
  openSuccessMessage(message: string) {
    this._snackBar.open(message, 'Close', {
      verticalPosition: 'top',
      duration: notificationDuration.time,
      panelClass: ['success-snackbar', 'snackbar-margin-top']
    });
  }

  // Open error message
  openErrorMessage(message: string) {
    this._snackBar.open(message, 'Close', {
      verticalPosition: 'top',
      duration: notificationDuration.time,
      panelClass: ['error-snackbar', 'snackbar-margin-top']
    });
  }
}
