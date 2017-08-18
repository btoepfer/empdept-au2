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
        .minLength(5)
        .required()
      .ensure("loc")
        .displayName("Location")
        .minLength(2)
        .required()
      .on(this.attributes);
  }
}
