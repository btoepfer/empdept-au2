import {inject } from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi, Router)
export class EmployeeList {


  constructor(departmentApi, router) {
    this.departmentApi = departmentApi;
    this.department = {};
    this.employees = [];
    this.employee_edit_id = null;
    this.originalEmployee = "";
    this.router = router;
    $('[data-toggle="popover"]').popover();
  }

  activate(model) {
    this.department = model.department;
    this.employees = model.employees;
  }

  attached() {
    $('[data-toggle="popover"]').popover();
  }

  editEmployeeInline(employee) {
    this.employee_edit_id = employee.id;
    this.originalEmployee = JSON.parse(JSON.stringify(employee));
     $("#ename").focus();
  }

  uneditEmployee() {
    this.employee_edit_id = 0;
    //ToDo: Originalwerte wieder herstellen, falls geändert
  }

  deleteEmployee(employee) {
    //const department_id = employee.deptId;
    
    if (confirm("Do you really want to delete this employee?")) {
      this.departmentApi.deleteEmployee(employee.id)
        .then(response => 
          this.router.navigateToRoute('department', {id: employee.deptId }, { replace: true, trigger: true })
        )   
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
 
  getEmployeeByID(id) {
    console.log(`employees: ${JSON.stringify(this.employees)}`);
    return this.employees.find(emp => {
      return (emp.id === id);
    })
    .attributes.ename;
  }

  showManagerList(employee) {
    let htmlString = "<ul>";
    if (employee.subordinates) {
      employee.subordinates.map(empId => {
        // htmlString = htmlString + "<li>"+this.getEmployeeByID(empId)+"</li>";
        htmlString = htmlString + "<li>"+empId+"</li>";
      });
    }
    htmlString = htmlString + "</ul>";
    return htmlString;
  }
  
  

}
