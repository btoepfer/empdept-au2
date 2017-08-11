import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi)
export class EmployeeNew {
  constructor(departmentApi) {
    this.departmentApi = departmentApi;
    this.employee = {};
    this.department_id = null;
  }

  activate(params) {
    this.department_id = params.id;
    this.departmentApi.getDepartments()
      .then(departments => this.departmentList = departments);
  }

  attached() {
    $("#empno").focus();
  }
  
   
  clearEmployee() {
    return {id:null, department_id:null, empno: null, ename: null, job: null, sal:null, hiredate:null};
  }

  
  addEmployee() {
    //alert(`Add Employee: ${this.department.id}.`);
    this.employee.department_id = this.department_id;
    let emp = this.employee;

    this.departmentApi.saveEmployee(emp)
      .then(response => this.departmentApi.getEmployees(this.department_id)
        .then(employees => {
          this.employees = employees;
          this.employee = this.clearEmployee();
          $("#empno").focus();
        })
      )
      .catch(err => alert(err.statusText));
  }
}
