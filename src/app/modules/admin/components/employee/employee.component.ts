import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DynamicDialogComponent } from 'src/app/shared/dialog/dynamic-dialog/dynamic-dialog.component';
import { dialogActions } from 'src/app/shared/enums/dialogActions';
import { Employee, Error} from 'src/app/shared/enums/messages';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeesComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  employees: any;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private _spinner: NgxSpinnerService,
    private _employeeService: EmployeeService, private _ns: NotificationService) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.displayedColumns = ['snumber','name', 'departments', 'salary', 'actions'];
    this.getEmployees();
  }

  // Get all employees
  getEmployees() {
    this._spinner.show();
    this._employeeService.getEmployees().pipe(finalize(() => {
      this._spinner.hide();
    })).subscribe((response: any) => {
      if (response) {
        this.employees = response;
        this.dataSource = new MatTableDataSource<any>(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
      }
    }, error => {
      this._ns.openErrorMessage(Error.message);
    })
  }

  // Register new user
  addEmployee() {
    const dialogRef = this.dialog.open(DynamicDialogComponent,{
      width:'700px',
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        headerText: dialogActions.Add.headerText,
        buttonText: dialogActions.Add.buttonText,
        action: dialogActions.Add.action
      },
    });

    dialogRef?.afterClosed()?.subscribe(result => {
      if(result){
        this._spinner.show();
        this._employeeService.addEmployee(result).pipe(finalize(()=>{
          this._spinner.hide();
        })).subscribe((res:any)=>{
          if(res){
            this.getEmployees();
            this._ns.openSuccessMessage(Employee.Add);
          }else{
          }
        },error=>{
          this._ns.openErrorMessage(Error?.message);
        })
      }
    },error=>{
      this._ns.openErrorMessage(Error.message);
    });
  }

  // Edit employee
  editEmployee(employeeInfo:any) {
    const dialogRef = this.dialog.open(DynamicDialogComponent,{
      width:'700px',
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        headerText: dialogActions.Update.headerText,
        buttonText: dialogActions.Update.buttonText,
        action: dialogActions.Update.action,
        employeeInfo: employeeInfo
      },
    });

    dialogRef?.afterClosed()?.subscribe(result => {
      if(result){
        this._spinner.show();
        this._employeeService.updateEmployee(result, employeeInfo?.id).pipe(finalize(()=>{
          this._spinner.hide();
        })).subscribe((res:any)=>{
          if(res){
            this._ns.openSuccessMessage(Employee.Update);
            this.getEmployees();
          }else{
          }
        },error=>{
          this._ns.openErrorMessage(Error?.message);
        })
      }
    },error=>{
      this._ns.openErrorMessage(Error.message);
    });
  }


  // Searching in user list
  applyFilter(event: string) {
    const filterValue = event;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Delete employee
  deleteEmployee(employeeId: any) {
    const dialogRef = this.dialog.open(DynamicDialogComponent,{
      width:'700px',
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        headerText: dialogActions.Delete.headerText,
        buttonText: dialogActions.Delete.buttonText,
        action: dialogActions.Delete.action
      },
    });

    dialogRef?.afterClosed()?.subscribe(result => {
      if(result){
        this._spinner.show();
        this._employeeService.deleteEmployee(employeeId).pipe(finalize(()=>{
          this._spinner.hide();
        })).subscribe((res:any)=>{
          if(res){
            this._ns.openSuccessMessage(Employee.Delete);
            this.getEmployees();
          }else{
          }
        },error=>{
          this._ns.openErrorMessage(Error?.message);
        })
      }
    },error=>{
      this._ns.openErrorMessage(Error.message);
    });
  }

  // Filter employees list according to the departments
  filterDepartments(department:any){
    if(department === 'All') {
      this.dataSource = new MatTableDataSource<any>(this.employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return
    }
    const employees = this.employees.filter((employee:any) => { return employee?.departments === department });
    this.dataSource = new MatTableDataSource<any>(employees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
