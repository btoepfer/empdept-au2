import {bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {inject, NewInstance} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DepartmentApi } from '../services/department-api';
import {Department } from '../models/department';
import {ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {SimpleValidationRenderer} from "../resources/validation/simple-validation-renderer";


@inject (Router, NewInstance.of(ValidationController), DepartmentApi, EventAggregator)
export class New {

  constructor(router, validationController, departmentApi, ea) {
    this.router = router;
    this.departmentApi = departmentApi;
    this.ea = ea;
    this.department = new Department();
    this.validationController = validationController;
    this.validationController.addRenderer(new SimpleValidationRenderer());
    // manual triggering of validation
    this.validationController.validateTrigger = validateTrigger.changeOrBlur;
    
    //this.validationController.subscribe(event => this.validateForm());
  }


  activate() {
    ValidationRules
      .ensure("dname")
        .displayName("Department Name")
        .required()
      .ensure("loc")
        .displayName("Location")
        .required()
      .on(this.department.attributes);
  }


  addDepartment() {
    let canSave = false;
    this.validationController.validate()
      .then(result => canSave=result.valid)
      .then(() => {     
        if (canSave) {
          this.departmentApi.saveDepartment(this.department)
            .then(department => this.department = department)
              .then(ea => this.ea.publish('department:created', this.department))
              .then(() => this.router.navigateToRoute('department', { id: this.department.id }))
            .catch(err => alert(err.statusText));
          this.validationController.reset()}
        });
     
    console.log(this.department);
  }

  attached() {
    $("#dname").focus();
  }
}
