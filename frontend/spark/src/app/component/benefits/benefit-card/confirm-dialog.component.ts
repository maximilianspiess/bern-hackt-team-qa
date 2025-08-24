import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogTitle
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNo()">No</button>
      <button mat-raised-button color="primary" (click)="onYes()">Yes</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, price: number}
  ) {}

  onYes(){
    this.dialogRef.close(true);
  }

  onNo(){
    this.dialogRef.close(false);
  }
}
