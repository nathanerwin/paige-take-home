import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    NavbarComponent,
    ConfirmDialogComponent,
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class SharedModule {
}
