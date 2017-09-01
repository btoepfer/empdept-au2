import {ValidationRules} from 'aurelia-validation';

export class User {
  id        = null;
  type      = "users";
  attributes = {
    password:           null,
    password_confirmation: null,
    full_name:          null,
    nickname:           null,
    email:              null,
    role:               null,
    token:              null};
  linkSelf  = "";

  constructor(data) {
    
    // Default
    this.attributes.role = "read-only";

    if (data) {
      this.id = data.id;
      this.attributes = data.attributes;
      this.linkSelf = data.links.self;
    };

    ValidationRules
    .ensure("full_name")
      .displayName("Name")
      .required()
      .minLength(5)
    .ensure("email")
      .displayName("E-Mail")
      .required()
      .email(5)
    .ensure("password")
      .displayName("Password")
      .required()
      .minLength(8)
    .ensure("password_confirmation")
      .displayName("Password")
      .required()
      .minLength(8)
    .on(this.attributes);
  };

  serialize() {
    //return this.attributes;
    return {
      "data": {
        "id": this.id,
        "type": this.type,
        "attributes": this.attributes
      }
    }
  };
}
