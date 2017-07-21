import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi)
export class New {
  constructor(departmentApi) {
        this.departmentApi = departmentApi;
    }

  @bindable department;

  addDepartment() {
    this.departmentApi.saveDepartment(this.department)
      .then(response =>  this.departmentApi.getDepartments().then(departments => this.filteredDepartments = departments)
      )
      .catch(err => alert(err.statusText));
  }

}
