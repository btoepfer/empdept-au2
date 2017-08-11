import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi)
export class EmployeeNew {
  constructor(departmentApi) {
    this.departmentApi = departmentApi;
    this.employee = {};
    this.department_id = 0;
  }

  activate(params) {
    this.department_id = params.id;
    console.log(`ID: ${params.id}`);
  }

  attached() {
    $("#empno").focus();
  }

  addEmployee() {
    //alert(`Add Employee: ${this.department.id}.`);
    this.employee.department_id = this.department.id;
    let emp = this.employee;

    this.departmentApi.saveEmployee(emp)
      .then(response => this.departmentApi.getEmployees(this.department.id)
        .then(employees => {
          this.employees = employees;
          this.employee = this.clearEmployee();
          $("#empno").focus();
        })
      )
      .catch(err => alert(err.statusText));
  }
}
