import {bindable, inject} from 'aurelia-framework';
import {DepartmentApi} from '../../services/department-api';
import {Department} from './department';

@inject(DepartmentApi)
export class Departments {

  constructor(departmentApi) {
    this.departments = [];
    this.filteredDepartments = [];
    this.filterTerm = "";
    this.newDepartment = "";
    this.departmentApi = departmentApi;
  }

 
  activate() {
      console.log("View activated");
      this.departmentApi.getDepartments().then(departments => this.filteredDepartments = departments);
  }



  filterDepartments(filterTerm) {

    if (this.departments.length === 0)
      this.departments = this.filteredDepartments;

    this.filteredDepartments = this.departments.filter(function(department) {
      return department.attributes.dname.toLowerCase().indexOf(filterTerm) !== -1;
    });
    return true; 
  }

  clearFilterTerm() {
    this.filterTerm = '';
    
    this.filterDepartments(this.filterTerm);
    $("#filterTerm").focus();
    return true;
  }  

  addDepartment() {
    if (this.newDepartment) {
      let newDept = new Department(this.departmentApi, this.newDepartment);
      this.departments.push(newDept);
      this.filteredDepartments.push(newDept);
      this.newDepartment = "";
    }
  }
  // Lifecycle Hooks

  created() {
    console.log("View created");
  }

  bind() {
    console.log("Data binded between model and view");
  }

  attached() {
    console.log("View attached to the DOM");
  }

  detached() {
    console.log("View detached from the DOM");
  }

  unbind() {
    console.log("Data unbinded");
  }

  // Navigation Lifecycle

  canDeactivate() {
    console.log("Deactivation: true");
    return true;
  }

  canActivate() {
    console.log("Activation: true");
    return true;
  }

  deactivate() {
    console.log("View deactivated");
    return true;
  }

  //activate() {
  //   console.log("View activated");
  //  this.departmentApi.getDepartments().then(departments => this.filteredDepartments = departments);
  //}



}
