
import {inject, NewInstance} from 'aurelia-dependency-injection';
import {DepartmentApi } from '../services/department-api';
import {Department } from '../models/department';
import {ValidationController, validateTrigger} from 'aurelia-validation';
import {SimpleValidationRenderer} from "../resources/validation/simple-validation-renderer";
import {Employee} from '../models/employee';

@inject (NewInstance.of(ValidationController), DepartmentApi)
export class EmployeeNew {

  constructor(validationController, departmentApi) {
    this.departmentApi = departmentApi;
    this.employee = new Employee();
    this.department_id = null;
    this.validationController = validationController;
    this.validationController.addRenderer(new SimpleValidationRenderer());
    this.validationController.validateTrigger = validateTrigger.change;
  }
 

  activate(params) {
    this.department_id = params.id;
    this.departmentApi.getDepartments()
      .then(departments => this.departmentList = departments);
  }

  attached() {
    $("#empno").focus();
  }
  
   
  clearEmployee() {
    return {id:null, department_id:null, empno: null, ename: null, job: null, sal:null, hiredate:null};
  }

  
  addEmployee() {
    //alert(`Add Employee: ${this.department.id}.`);

    this.employee.relationships.department.data.id = this.department_id;
    let emp = this.employee;

    this.validationController.validate()
      .then(result => { 
        if (result.valid) {
          this.departmentApi.saveEmployee(emp)
            .then(response => this.departmentApi.getEmployees(this.department_id)
              .then(employees => {
                this.employees = employees;
                this.employee = this.clearEmployee();
                $("#empno").focus();
              }))
            .catch(err => alert(err.statusText))
        }});
  }
}
