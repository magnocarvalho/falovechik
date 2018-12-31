import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatSidenavModule,
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule,
  MatStepperModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule,
  MatRippleModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AfiliadosComponent } from './afiliados/afiliados.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    AfiliadosComponent,
    ToolbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
