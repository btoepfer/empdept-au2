import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class DepartmentApi {

    constructor(http) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:3000/')
                .withDefaults({
                    headers: {
                        'content-type': 'application/vnd.api+json',
                        'Accept': 'application/vnd.api+json',
                        'X-Requested-With': 'Fetch'
                    }
                })
        });
        this.http = http;
    }

    getDepartments() {
        return this.http.fetch('departments')
            .then(response => response.json())
            .then(departments => {
                //console.log(departments.data);
                return departments.data;
            });
    }

     getDepartment(departmentID) {
        return this.http.fetch(`departments/${departmentID}`)
            .then(response => response.json())
            .then(department => {
                return department.data;
            });
    }

    getEmployees(departmentID) {
        return this.http.fetch(`departments/${departmentID}/employees`)
            .then(response => response.json())
            .then(employees => {
                //console.log(departments.data);
                return employees.data;
            });
    }

   addEmployee(employee)  {
     console.log(json(employee));
     console.log(employee);
    let json_string = {"data":{"attributes":employee, 
                                "relationships":{"department":{"data":{"type":"departments", "id":employee.department_id}}}, 
                                "type":"employees"}};
    return this.http.fetch('employees', {
          method: 'post',
          body: JSON.stringify(json_string)
        })
        .then(response => { 
          response.json();
          console.log(response);
        });
    };
}
