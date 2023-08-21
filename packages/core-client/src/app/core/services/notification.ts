import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const DEFAULT_ERROR_MESSAGE = 'Oops, something went wrong...';
const DEFAULT_SUCCESS_MESSAGE = 'Success!';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showErrorNotification(message: string = DEFAULT_ERROR_MESSAGE): void {
    this.snackBar.open(message, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 1000,
      panelClass: ['error-snackbar'],
    });
  }

  showSuccessNotification(message: string = DEFAULT_SUCCESS_MESSAGE): void {
    this.snackBar.open(message, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 1000,
      panelClass: ['success-snackbar'],
    });
  }
}
