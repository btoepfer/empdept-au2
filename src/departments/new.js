import { bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {inject, NewInstance} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import { DepartmentApi } from '../services/department-api';
import { Department } from '../models/department';
import {Validator, ValidationRules, ValidationControllerFactory , validateTrigger} from 'aurelia-validation';
import {SimpleValidationRenderer} from "../resources/validation/simple-validation-renderer";


@inject (Router, Validator, ValidationControllerFactory, DepartmentApi, EventAggregator)
export class New {

  canSave = false;

  constructor(router, validator, controllerFactory, departmentApi, ea) {
    this.router = router;
    this.validator = validator;
    this.departmentApi = departmentApi;
    this.ea = ea;
    this.department = new Department();
    this.validationController = controllerFactory.createForCurrentScope(validator);
    this.validationController.addRenderer(new SimpleValidationRenderer());
    // manual triggering of validation
    this.validationController.validateTrigger = validateTrigger.changeOrBlur;
    this.validationController.subscribe(event => this.validateForm());
  }

  validateForm() {
    this.validator.validateObject(this.department.attributes)
      .then(results => this.canSave = results.every(result => result.valid));
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
    
    this.validateForm();
     
    if (this.canSave) {
      this.departmentApi.saveDepartment(this.department)
        .then(department => this.department = department)
          .then(ea => this.ea.publish('department:created', this.department))
          .then(() => this.router.navigateToRoute('department', { id: this.department.id }))
        .catch(err => alert(err.statusText));
      this.validationController.reset();
     
      console.log(this.department);
      //this.router.navigateToRoute('department', { id: this.department.id });
    }
  }

  attached() {
    $("#dname").focus();
  }
}
