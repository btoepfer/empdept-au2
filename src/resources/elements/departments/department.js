import {bindable, inject} from 'aurelia-framework';
import {DepartmentApi} from '../../services/department-api';

@inject(DepartmentApi)
export class Department {

  constructor(departmentApi, dname) {
    this.department_name = "";
    this.department = "";
    this.departmentApi = departmentApi;
    this.dname = dname;
    this.id = 0;
  }

  activate(params) {
    this.departmentApi.getDepartment(params.id).then(department => this.department = department);
  }

}
