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
    this.formValue.patchValue({
      empID: employee.empID,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      salary: employee.salary,
    });
  }

  deleteEmployeeDetails(id: number) {
    this.api.deleteEmployee(id).subscribe((res: any) => {
      console.log(res);
      alert('Employee Deleted successfully');
      this.getEmployeeDetails();
    });
  }
}
