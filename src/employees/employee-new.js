import {bindable} from 'aurelia-framework';
import {inject, NewInstance} from 'aurelia-dependency-injection';
import {DepartmentApi } from '../services/department-api';
import {ValidationController, validateTrigger, ValidationRules} from 'aurelia-validation';
import {SimpleValidationRenderer} from "../resources/validation/simple-validation-renderer";
import {DialogController} from 'aurelia-dialog';
import {Department } from '../models/department';
import {Employee} from '../models/employee';

@inject (NewInstance.of(ValidationController), DepartmentApi, DialogController)
export class EmployeeNew {

  @bindable
    departmentList;
  

  constructor(validationController, departmentApi, dialogController) {
    this.departmentApi = departmentApi;
    this.employee = new Employee();
    this.validationController = validationController;
    this.departmentList = [];
    this.validationController.addRenderer(new SimpleValidationRenderer());
    this.validationController.validateTrigger = validateTrigger.changeOrBlur;
    this.dialogController = dialogController;
    
  }
 

  activate(model) {
    this.model = model;
    console.log(`model: ${JSON.stringify(model)}`);
    if (model.employee) {
      this.employee = model.employee;
    }
    else {
      this.employee.deptId = model.departmentId;
    }
    this.employee.deptId = model.departmentId;
    this.departmentApi.getDepartments()
      .then(departments => this.departmentList = departments);
  }


  
   
  clearEmployee() {
    return {id:null, department_id:null, empno: null, ename: null, job: null, sal:null, hiredate:null};
  }

  
  addEmployee() {
    const deptId = this.employee.deptId;
    this.validationController.validate()
      .then(result => { 
        if (result.valid) {
          this.departmentApi.saveEmployee(this.employee)
            .then(employees => {
              /* nur bei Mehrfacherfassung
              this.employees = employees;
              this.employee = new Employee();
              this.employee.deptId = deptId;
              $("#empno").focus();
              */
              this.dialogController.ok(deptId);
            })
            .catch(err => alert(err.statusText))
        }});
    
    this.validationController.reset();
  }
  
  cancel() {
    this.dialogController.cancel('');
  }

}
