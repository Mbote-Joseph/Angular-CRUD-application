import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { EmployeeModel } from '../../employee.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;

  employeeModelObject: EmployeeModel = new EmployeeModel();
  employeeData: EmployeeModel[] = [];
  showAdd: boolean = false;
  showUpdate: boolean = false;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      empID: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      salary: [''],
    });
    this.getEmployeeDetails();
  }

  postEmployeeDetails() {
    this.showUpdate = false;
    this.showAdd = true;
    this.employeeModelObject.empID = this.formValue.value.empID;
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.phone = this.formValue.value.phone;
    this.employeeModelObject.salary = this.formValue.value.salary;

    console.log(this.employeeModelObject);

    this.api.postEmployee(this.employeeModelObject).subscribe(
      (res: any) => {
        console.log(res);
        alert('Employee Added successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err) => {
        alert('Something Went wrong');
      }
    );
  }

  getEmployeeDetails() {
    this.api.getEmployee().subscribe((res: any) => {
      console.log(res);
      this.employeeData = res;
    });
  }

  updateEmployeeDetails(employee: EmployeeModel) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObject.id = employee.id;
    this.formValue.controls['empID'].setValue(employee.empID);
    this.formValue.controls['firstName'].setValue(employee.firstName);
    this.formValue.controls['lastName'].setValue(employee.lastName);
    this.formValue.controls['email'].setValue(employee.email);
    this.formValue.controls['phone'].setValue(employee.phone);
    this.formValue.controls['salary'].setValue(employee.salary);
  }

  updateEmployee() {
    this.employeeModelObject.empID = this.formValue.value.empID;
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.phone = this.formValue.value.phone;
    this.employeeModelObject.salary = this.formValue.value.salary;

    console.log(this.employeeModelObject);

    this.api
      .updateEmployee(this.employeeModelObject, this.employeeModelObject.id)
      .subscribe(
        (res: any) => {
          console.log(res);
          alert('Employee Updated successfully');
          this.getEmployeeDetails();
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
        },
        (err) => {
          alert('Something Went wrong');
        }
      );
  }

  deleteEmployeeDetails(id: number) {
    this.api.deleteEmployee(id).subscribe((res: any) => {
      console.log(res);
      alert('Employee Deleted successfully');
      this.getEmployeeDetails();
    });
  }
}
