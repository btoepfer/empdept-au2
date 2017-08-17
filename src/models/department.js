import {ValidationRules} from 'aurelia-validation';

export class Department {
  id      = null;
  attributes = {
    dname : null,
    loc   : null};

  constructor() {
    ValidationRules
      .ensure("dname")
        .displayName("Department Name")
        .required()
      .ensure("loc")
        .displayName("Location")
        .required()
      .on(this.attributes);
  }
}
