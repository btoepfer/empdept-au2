import {bindable, inject} from 'aurelia-framework';
import {DepartmentApi} from '../../services/department-api';

@inject(DepartmentApi)
export class Departments {

  constructor(departmentApi) {
    this.departments = [];
    this.filteredDepartments = [];
    this.filterTerm = "";
    this.departmentApi = departmentApi;
  }

 activate() {
    this.departmentApi.getDepartments().then(departments => this.filteredDepartments = departments);
  }


  filterDepartments() {

    if (this.departments.length === 0)
      this.departments = this.filteredDepartments;

    // console.log(this.departments);
    
    let filterTerm = this.filterTerm.toLowerCase();
    this.filteredDepartments = this.departments.filter(function(department) {
      return department.attributes.dname.toLowerCase().indexOf(filterTerm) !== -1;
    });
    return true; 
  }
}
