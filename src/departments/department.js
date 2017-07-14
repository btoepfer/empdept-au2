import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi)
export class Department {

    constructor(departmentApi, dname, loc) {
        this.department = "";
        this.employees = [];
        this.departmentApi = departmentApi;
        this.dname = dname;
        this.loc = loc;
        this.id = 0;
        this.employee = {department_id:"", empno: "", ename: "TOEPFER", job: "CLERK", sal:"", hiredate:""};
    }

    activate(params) {
        // Get Department
        this.departmentApi.getDepartment(params.id).then(department => this.department = department);

        // Get Employees of selected Department
        this.departmentApi.getEmployees(params.id).then(employees => this.employees = employees);
    }

    editEmployee(id) {
        alert(`Employee: ${id} edited.`);
    }

    deleteEmployee(id) {
        alert(`Employee: ${id} deleted.`);
    }

    addEmployee() {
        alert(`Add Employee: ${this.department.id}.`);
        this.employee.department_id = this.department.id;
        let emp = this.employee;

        this.departmentApi.addEmployee(emp)
         .then(employee => {console.log(employee);});
    }


}