import {
  MatButtonModule, MatCheckboxModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatTableDataSource, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule,MatCard
} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@NgModule({
  imports: [

    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatMenuModule,
  

  ],
  exports: [

    MatButtonModule, MatCheckboxModule, MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatMenuModule

  ],
})
export class MaterialModule { }
