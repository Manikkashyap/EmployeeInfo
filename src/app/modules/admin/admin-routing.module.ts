import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './components/employee/employee.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/employees', pathMatch:'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'employees', component: EmployeesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
