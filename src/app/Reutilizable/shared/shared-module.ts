import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//componentes angular material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbarRow } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';




@NgModule({
  declarations: [],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    MatCardModule, MatInputModule, MatButtonModule, MatSelectModule,
    MatSnackBarModule, MatTableModule, MatPaginatorModule, MatDialogModule,
    LayoutModule, MatToolbarModule, MatToolbarRow, MatIconModule,
    MatListModule, MatSidenavModule, MatTooltipModule, MatAutocompleteModule,
    MatDatepickerModule, MatNativeDateModule, MatMomentDateModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatGridListModule, MatNavList,
  ],
  exports: [
    CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    MatCardModule, MatInputModule, MatButtonModule, MatSelectModule,
    MatSnackBarModule, MatTableModule, MatPaginatorModule, MatDialogModule,
    LayoutModule, MatToolbarModule, MatToolbarRow, MatIconModule,
    MatListModule, MatSidenavModule, MatTooltipModule, MatAutocompleteModule,
    MatDatepickerModule, MatNativeDateModule, MatMomentDateModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatGridListModule, MatNavList,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class SharedModule { }
