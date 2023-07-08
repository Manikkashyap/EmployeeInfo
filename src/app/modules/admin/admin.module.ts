import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { EmployeesComponent } from './components/employee/employee.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [
    EmployeesComponent,
    AdminComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  providers:[CurrencyPipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class AdminModule { }
