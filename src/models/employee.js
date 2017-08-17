import {ValidationRules} from 'aurelia-validation';

export class Employee {
  id      = null;
  attributes = {
    empno   :  null,
    ename   :  null,
    job     :  null,
    hiredate:  null,
    sal     :  null};
  relationships = {
    "department":{
      data   : {
        type : "departments", 
        id   : null
      }
    }
  };

  constructor() {
    ValidationRules
    .ensure("empno")
      .displayName("Employee no.")
      .required()
    .ensure("ename")
      .displayName("Employee name")
      .required()
    .ensure("job")
      .displayName("Job title")
      .required()
    .ensure("sal")
      .displayName("Salary")
      .required()
    .on(this.attributes);
  }
}
