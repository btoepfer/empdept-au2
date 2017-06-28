import {bindable, inject} from 'aurelia-framework';
import {DepartmentApi} from '../../services/department-api';

@inject(DepartmentApi)
export class Departments {

  constructor(departmentApi) {
    this.departments = [];
    this.departmentApi = departmentApi;
  }

  activate() {
    this.departmentApi.getDepartments().then(departments => this.departments = departments);
  }
}
