
import {Router, Redirect} from 'aurelia-router';
import { bindable, inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import { DepartmentApi } from '../services/department-api';
import {CommonDialogs} from '../resources/dialogs/common-dialogs';

@inject(DepartmentApi, EventAggregator, Router, CommonDialogs)
export class Department {

  constructor(departmentApi, ea, router, commonDialogs) {
    this.data = {};
    this.department = {};
    this.employees = [];
    this.departmentApi = departmentApi;
    this.isEditing = false;
    this.ea = ea;
    this.router = router;
    this.commonDialogs = commonDialogs;
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
    this.departmentApi.getDepartment(params.id)
      .then(department => this.department = department)
      .then(employees => this.departmentApi.getEmployees(this.department)
        .then(employees => this.employees = employees)
          .then(() => {this.data.department=this.department;
                   this.data.employees=this.employees
                  }
                )
            );

    // Get Employees of selected Department
    //this.departmentApi.getEmployees(params.id).then(employees => this.employees = employees);
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
        .then(response => 
           this.router.navigateToRoute('departments', { }, { replace: true, trigger: true }))
        .catch(err => alert(err.statusText));
    }
  }


  newEditEmployee(departmentId, employee) {
    this.commonDialogs.showEmployeeEdit(departmentId, employee).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      if (!response.wasCancelled)
        this.router.navigateToRoute('department', {id: response.output}, { replace: true, trigger: true });
    });
  }
 

}
