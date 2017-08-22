import { ValidationRules } from 'aurelia-validation';

export class Department {
  id = null;
  type = "departments";
  attributes = {
    dname: null,
    loc: null
  };
  linkEmployees = "";
  linkSelf = "";


  constructor(data) {
    if (data) {
      this.id = data.id;
      this.attributes = data.attributes;
      this.linkEmployees = data.relationships.employees.links.related;
      this.linkSelf = data.links.self;
    };

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
  };

  serialize() {
    return {
      "data": {
        "id": this.id,
        "type": this.type,
        "attributes": this.attributes
      }
    }
  };

}
