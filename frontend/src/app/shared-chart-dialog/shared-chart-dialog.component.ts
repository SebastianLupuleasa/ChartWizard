import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shared-chart-dialog',
  templateUrl: './shared-chart-dialog.component.html',
  styleUrls: ['./shared-chart-dialog.component.scss']
})
export class SharedChartDialogComponent {

  email: string = "";

  constructor(public dialogRef: MatDialogRef<SharedChartDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
