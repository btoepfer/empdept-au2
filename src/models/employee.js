import {ValidationRules} from 'aurelia-validation';

export class Employee {
  id        = null;
  type      = "employees";
  attributes = {
    empno   :  null,
    ename   :  null,
    job     :  null,
    hiredate:  null,
    sal     :  null};
  deptId    =  null;
  manager   =  null;
  subordinates = [];
  linkSelf  = "";

  constructor(data) {

    if (data) {
      this.id = data.id;
      this.attributes = data.attributes;
      this.deptId = data.relationships.department.data.id;
      if (data.relationships.manager.data)
        this.manager = data.relationships.manager.data.id;

      if (data.relationships.subordinates.data)
        data.relationships.subordinates.data.map(so => {
          this.subordinates.push(so.id);
        });
      //console.log(`subordinates: ${this.subordinates}`);
      this.linkSelf = data.links.self;
    };

    ValidationRules
    .ensure("deptId")
      .displayName("Department")
      .required()
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
  };

  serialize() {
    return {
      "data": {
        "id": this.id,
        "type": this.type,
        "attributes": this.attributes,
        "relationships": {
          "department":{
            "data"   : {
              "type" : "departments", 
              "id"   : this.deptId
            }
          }
        }
      }
    };
  };

}
