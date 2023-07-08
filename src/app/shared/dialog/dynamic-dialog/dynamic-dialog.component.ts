import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dialogActions } from '../../enums/dialogActions';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.css']
})
export class DynamicDialogComponent implements OnInit {
  dialogActions = dialogActions;
  submitted: boolean = false;
  employeeForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
      this.makeEmployeeFormForm();
      if (this.data?.action === this.dialogActions.Update.action && this.data?.employeeInfo) {
        this.employeeForm.patchValue(this.data?.employeeInfo);
      }
    }

  ngOnInit(): void { }

  // Make employee form
  makeEmployeeFormForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      departments: ['', [Validators.required]],
      salary: ['', [Validators.required]],
    })
  }

  // Get form controls
  get employeeControl(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }

  // Get dialog box value
  getDialogValue() {
    if(this.data?.action !== this.dialogActions.Delete.action) {
      this.submitted = true;
      if (this.employeeForm.valid) {
        this.dialogRef.close(this.employeeForm.value);
      }
    } else {
      this.dialogRef.close(true);
    }
  }

}
