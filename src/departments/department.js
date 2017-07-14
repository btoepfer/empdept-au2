import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi)
export class Department {

  

  constructor(departmentApi, dname, loc) {
    this.department = "";
    this.employees = [];
    this.departmentApi = departmentApi;
    this.dname = dname;
    this.loc = loc;
    this.id = 0;
    this.employee = {};
  }

  clearEmployee() {
    return {id:null, department_id:null, empno: null, ename: null, job: null, sal:null, hiredate:null};
  }

  activate(params) {
    // Get Department
    this.departmentApi.getDepartment(params.id).then(department => this.department = department);

    // Get Employees of selected Department
    this.departmentApi.getEmployees(params.id).then(employees => this.employees = employees);
  }

  editEmployee(id) {
    alert(`Employee: ${id} edited.`);
  }


  deleteEmployee(id) {
    if (confirm("Do you really want to delete this employee?")) {
      this.departmentApi.deleteEmployee(id)
        .then(response => this.departmentApi.getEmployees(this.department.id)
          .then(employees => this.employees = employees))
        .catch(err => alert(err.statusText));
    }
  }

  saveEmployee() {
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
