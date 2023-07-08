import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  // Get all employees
  getEmployees() {
    return this._http.get(`${environment.apiUrl}employees`);
  }

  // Add new employee
  addEmployee(employee:any){
    return this._http.post(`${environment.apiUrl}employees`, employee);
  }

  // Update employee
  updateEmployee(employeeInfo:any, employeeId: any) {
    return this._http.put(`${environment.apiUrl}employees/${employeeId}`, employeeInfo);
  }

  // Delete employee
  deleteEmployee(employeeId: any) {
    return this._http.delete(`${environment.apiUrl}employees/${employeeId}`);
  }
}
