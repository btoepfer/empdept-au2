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

  saveDepartment(department)  {
    let dept_jsonapi = {"data":{
        "id":null, 
        "attributes":department
      }};

    let http_method = "POST";
    let http_url = 'departments';
     
    if (department.id) {
      http_method = "PATCH";
      http_url    = `${http_url}/${department.id}`;
      dept_jsonapi = {"data":{
        "id":department.id, 
        "attributes":department.attributes}
        //"type":"departments"
      };
    };
    
    console.log(JSON.stringify(department));

    return this.http.fetch(http_url, {
          method: http_method,
          body: JSON.stringify(dept_jsonapi)
        })
        .then(response => response.json())
          .then(department => {
            console.log(department.data);
            return department.data;
        });
    };

  deleteDepartment(id) {
    const dept_jsonapi = {"data":{
      "id":id 
      //"relationships":{"department":{"data":{"type":"departments", "id":employee.department_id}}}, 
      //"type":"employees"
    }};
    return this.http.fetch(`departments/${id}`, {
        method: "DELETE",
      })
      .then(response => { 
        console.log(response);
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
    let emp_jsonapi = {"data":{
        "id":employee.id, 
        "attributes":employee,
        "relationships":{"department":{"data":{"type":"departments", "id":employee.department_id}}}
        //"type":"employees"
      }};

    let http_method = "POST";
    let http_url = 'employees';
     
    if (employee.id) {
      http_method = "PATCH";
      http_url    = `${http_url}/${employee.id}`;
      emp_jsonapi = {"data":{
        "id":employee.id, 
        "attributes":employee.attributes,
        "relationships":employee.relationships}
        //"type":"employees"
      };
    };
    
    console.log(JSON.stringify(employee));

    return this.http.fetch(http_url, {
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
