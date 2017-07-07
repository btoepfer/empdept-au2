import { bindable, inject } from 'aurelia-framework';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi)
export class Department {

    constructor(departmentApi, dname, loc) {
        this.result = "";
        this.departmentApi = departmentApi;
        this.dname = dname;
        this.loc = loc;
        this.id = 0;
    }

    activate(params) {
        this.departmentApi.getDepartment(params.id).then(department => this.result = department);
    }

    bind() {
        //this.dname = this.result.attributes.dname;
        //this.loc   = this.result.loc;
        console.log(`DName: ${this.dname}`)
    }

}