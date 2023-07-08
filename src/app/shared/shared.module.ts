import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogComponent } from './dialog/dynamic-dialog/dynamic-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgxSpinnerModule } from "ngx-spinner";
import { OverlayComponent } from './layouts/overlay/overlay.component';
import { MaterialModule } from '../modules/material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    DynamicDialogComponent,
    OverlayComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale' })
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    HeaderComponent,
    MatDialogModule,
    NgxSpinnerModule,
    OverlayComponent
  ],
  providers: [CurrencyPipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
