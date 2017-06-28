import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class DepartmentApi {
  
  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000/')
          .withDefaults({
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
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
        console.log(departments.data);
        return departments.data;
      });
  }

  getDepartment(departmentID) {
    return this.http.fetch('departments/'+departmentID)
      .then(response => response.json())
      .then(department => {
        console.log(department.data);
        return department.data;
      });
  }
}
