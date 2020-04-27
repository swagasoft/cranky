import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

import {  MatCheckboxModule, MatBadgeModule, MatInputModule,
   MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule, MatRadioModule,
    MatSelectModule, MatMenuModule, MatSidenavModule, MatToolbarModule,
     MatListModule, MatStepperModule, MatTabsModule,MatGridListModule,
      MatTableModule, MatExpansionModule, MatButtonToggleModule, MatChipsModule, 
      MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule,
       MatTooltipModule, MatSnackBarModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';

const MaterialModules = [MatSliderModule, MatButtonModule,MatCardModule,MatCheckboxModule,
  MatBadgeModule,MatInputModule,MatAutocompleteModule,MatDatepickerModule,MatFormFieldModule,
  MatRadioModule,MatSelectModule,MatMenuModule,MatSidenavModule,MatToolbarModule,MatListModule,
  MatGridListModule,
  ,MatStepperModule,MatTabsModule,MatTableModule,MatExpansionModule,
  MatButtonToggleModule,MatChipsModule,MatIconModule,MatProgressSpinnerModule,MatProgressBarModule,
  MatDialogModule,MatTooltipModule,MatSnackBarModule,MatSortModule,MatPaginatorModule,
  ReactiveFormsModule,FormsModule, MatCardModule, MatChipsModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MaterialModules
  ],
  exports : [MaterialModules]
})
export class MaterialModule { }
