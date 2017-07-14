import { HttpClient} from 'aurelia-fetch-client';
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

  saveEmployee(employee)  {
    const emp_jsonapi = {"data":{
        "id":employee.id, 
        "attributes":employee, 
        //"relationships":{"department":{"data":{"type":"departments", "id":employee.department_id}}}, 
        //"type":"employees"
      }};

    let http_method = "post";
    if (employee.id) 
      http_method = "PATCH";

    return this.http.fetch('employees', {
          method: http_method,
          body: JSON.stringify(emp_jsonapi)
        })
        .then(response => { 
          response.json();
          console.log(response);
        });
    };

  deleteEmployee(id) {
    const emp_jsonapi = {"data":{
      "id":id 
      //"relationships":{"department":{"data":{"type":"departments", "id":employee.department_id}}}, 
      //"type":"employees"
    }};
    return this.http.fetch(`employees/${id}`, {
        method: "DELETE",
      })
      .then(response => { 
        console.log(response);
      });
    }
}
