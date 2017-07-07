import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';
import { Department } from './department';

@inject(DepartmentApi)
export class Departments {

    constructor(departmentApi) {
        this.departments = [];
        this.filteredDepartments = [];
        this.filterTerm = "";
        this.newDepartment = "";
        this.departmentApi = departmentApi;
    }

    configureRouter(config, router) {
        config.map([
            { route: '', moduleId: './no-selection' },
            { route: ':id', moduleId: './department', name: 'department' }
        ]);

        this.deptRouter = router;
    }

    activate() {
        console.log("View activated");
        this.departmentApi.getDepartments().then(departments => this.filteredDepartments = departments);
        console.log(this.deptRouter);
    }



    filterDepartments(filterTerm) {

        if (this.departments.length === 0)
            this.departments = this.filteredDepartments;

        this.filteredDepartments = this.departments.filter(function(department) {
            return department.attributes.dname.toLowerCase().indexOf(filterTerm) !== -1;
        });
        return true;
    }

    clearFilterTerm() {
        this.filterTerm = '';

        this.filterDepartments(this.filterTerm);
        $("#filterTerm").focus();
        return true;
    }

    addDepartment() {
        if (this.newDepartment) {
            let newDept = new Department(this.departmentApi, this.newDepartment);
            this.departments.push(newDept);
            this.filteredDepartments.push(newDept);
            this.newDepartment = "";
        }
    }




}