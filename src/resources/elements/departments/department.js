import {bindable, inject} from 'aurelia-framework';
import {DepartmentApi} from '../../services/department-api';

@inject(DepartmentApi)
export class Department {

  constructor(departmentApi) {
    this.department_name = "";
    this.department = "";
    this.departmentApi = departmentApi;
  }

  activate(params) {
    this.departmentApi.getDepartment(params.id).then(department => this.department = department);
  }
}
