import {bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {inject, NewInstance} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DepartmentApi } from '../services/department-api';
import {Department } from '../models/department';
import {ValidationController, validateTrigger} from 'aurelia-validation';
import {SimpleValidationRenderer} from "../resources/validation/simple-validation-renderer";


@inject (Router, NewInstance.of(ValidationController), DepartmentApi, EventAggregator)
export class DepartmentNew {

  @bindable
    department;

  constructor(router, validationController, departmentApi, ea) {
    this.router = router;
    this.departmentApi = departmentApi;
    this.ea = ea;
    this.department = new Department();
    this.validationController = validationController;
    this.validationController.addRenderer(new SimpleValidationRenderer());
    this.validationController.validateTrigger = validateTrigger.changeOrBlur;
  }


  addDepartment() {
    this.validationController.validate()
      .then(result => { 
        if (result.valid) {
          this.departmentApi.saveDepartment(this.department)
            .then(department => this.department = department)
              .then(ea => this.ea.publish('department:created', this.department))
              .then(() => this.router.navigateToRoute('department', { id: this.department.id }))
            .catch(err => alert(err.statusText));
          this.validationController.reset()}
        });
  }

  attached() {
    $("#dname").focus();
    $('[data-toggle="popover"]').popover();
  }

}
