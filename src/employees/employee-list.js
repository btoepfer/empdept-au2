import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi)
export class EmployeeList {
  constructor(departmentApi) {
    this.departmentApi = departmentApi;
    this.department = {};
    this.employees = [];
    this.employee_edit_id = null;
    this.originalEmployee = "";
  }

  activate(model) {
    this.department = model.department;
    this.employees = model.employees;
  }

  editEmployee(employee) {
    this.employee_edit_id = employee.id;
    this.originalEmployee = JSON.parse(JSON.stringify(employee));
     $("#ename").focus();
  }

  uneditEmployee() {
    this.employee_edit_id = 0;
    //ToDo: Originalwerte wieder herstellen, falls geändert
  }

  deleteEmployee(employee) {
    const department_id = employee.relationships.department.data.id;
    if (confirm("Do you really want to delete this employee?")) {
      this.departmentApi.deleteEmployee(employee.id)
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
 

  

}