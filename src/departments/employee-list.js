import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi)
export class EmployeeList {

  constructor(departmentApi) {
    this.department = "";
    this.departmentApi = departmentApi;
    this.employees = [];
    this.employee_edit_id = null;
  }

  @bindable employees;
  @bindable department;


  editEmployee(id) {
    this.employee_edit_id = id;

  }

  uneditEmployee() {
    this.employee_edit_id = 0;
  }

  deleteEmployee(id, department_id) {
    if (confirm("Do you really want to delete this employee?")) {
      this.departmentApi.deleteEmployee(id)
        .then(response => this.departmentApi.getEmployees(department_id)
          .then(employees => this.employees = employees))
        .catch(err => alert(err.statusText));
    }
  }

  saveEmployee(emp) {
    console.log(`Save Employee: ${emp.id}.`);
    //let emp = this.employee;

    this.departmentApi.saveEmployee(emp)
      .then(response => {this.employee_edit_id = 0;}
      )
      .catch(err => alert(err.statusText));
  }
  
  clearEmployee() {
    return {id:null, department_id:null, empno: null, ename: null, job: null, sal:null, hiredate:null};
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
