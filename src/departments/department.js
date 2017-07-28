import { bindable, inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi, EventAggregator)
export class Department {

  constructor(departmentApi,ea, dname, loc) {
    this.department = {};
    this.departmentApi = departmentApi;
    this.dname = dname;
    this.loc = loc;
    this.id = 0;
    this.employee = {};
    this.isEditing = false;
    this.ea = ea;
    this.originalDepartment = "";
    
  }


  editDepartment() {
    this.isEditing = true;
    $("#dname").focus();
    this.originalDepartment = JSON.parse(JSON.stringify(this.department));
    console.log(`Original: ${this.originalDepartment}`);
  }

  uneditDepartment() {
    this.isEditing = false;

    this.department = JSON.parse(JSON.stringify(this.originalDepartment));
  }

  activate(params) {
    this.uneditDepartment();
    // Get Department
    this.departmentApi.getDepartment(params.id).then(department => this.department = department);

    // Get Employees of selected Department
    this.departmentApi.getEmployees(params.id).then(employees => this.employees = employees);
  }

 saveDepartment() {
    this.departmentApi.saveDepartment(this.department)
      .then(department => this.department = department)
        .then(ea => this.ea.publish('department:updated', this.department))
      .catch(err => alert(err.statusText));
     this.uneditDepartment();
  }

  deleteDepartment(id) {
    if (confirm("Do you really want to delete this Department?")) {
      this.departmentApi.deleteDepartment(id)
        .then(response => {this.department={};})
        .catch(err => alert(err.statusText));
    }
  }

}
