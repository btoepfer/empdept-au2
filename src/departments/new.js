import { bindable, inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi, EventAggregator)
export class New {
  constructor(departmentApi, ea) {
    this.departmentApi = departmentApi;
    this.ea = ea;
    this.department = {};
  }


  addDepartment() {
    this.departmentApi.saveDepartment(this.department)
      .then(department => this.department = department)
        .then(ea => this.ea.publish('department:created', this.department))
        .then(e => this.department = {})
      .catch(err => alert(err.statusText));
     $("#dname").focus();
  }

  attached() {
    $("#dname").focus();
  }
}
