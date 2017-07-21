import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi)
export class Department {

  

  constructor(departmentApi, dname, loc) {
    this.department = "";
    this.departmentApi = departmentApi;
    this.dname = dname;
    this.loc = loc;
    this.id = 0;
    this.employee = {};
    
  }


  activate(params) {
    // Get Department
    this.departmentApi.getDepartment(params.id).then(department => this.department = department);

    // Get Employees of selected Department
    this.departmentApi.getEmployees(params.id).then(employees => this.employees = employees);
  }



}
