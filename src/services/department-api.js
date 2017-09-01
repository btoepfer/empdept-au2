import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import {getCookie} from '../resources/helpers/cookies';

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
      .withInterceptor({
        request(request) {
          const token = getCookie({name: "empdept"});
          console.log(token);
          request.headers.append("Authorization", token);
          return request;
        }
      })
    });
    this.http = http;
  }

  collectDepartments(departments) {
    let depts = [];
    let department;

    // returning an array of Departments
    departments.data.forEach((dept) => {
      department = new Department(dept);
      depts.push(department);
    });
    return depts;
  }

  getDepartments(filter = "none") {
    return this.http.fetch(`departments?filter=${filter}`)
      .then(response => response.json())
      .then(departments => {
        return this.collectDepartments(departments);
      });
  }

  getDepartment(departmentID) {
    let dept;
    return this.http.fetch(`departments/${departmentID}`)
      .then(response => response.json())
      .then(department => {
        dept = new Department(department.data);
        return dept;
      });
  }

  saveDepartment(department) {
    console.log(`department vor save: ${department}`);

    let http_method = "POST";
    let http_url = 'departments';

    if (department.id) {
      http_method = "PATCH";
      http_url = `${http_url}/${department.id}`;
    };

    return this.http.fetch(http_url, {
      method: http_method,
      body: JSON.stringify(department.serialize())
    })
      .then(response => response.json())
      .then(department => {
        console.log(department.data);
        return department.data;
      });
  };

  deleteDepartment(id) {
    const dept_jsonapi = {
      "data": {
        "id": id
        //"relationships":{"department":{"data":{"type":"departments", "id":employee.department_id}}}, 
        //"type":"employees"
      }
    };
    return this.http.fetch(`departments/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        window.status = "Department deleted";
      });
  }

  ///////////////////// EMPLOYEES /////////////////////////
  collectEmployees(employees) {
    let emps = [];
    let employee;

    // returning an array of Employees
    employees.data.forEach((emp) => {
      employee = new Employee(emp);
      emps.push(employee);
    });
    return emps;
  }

  getEmployees(department) {
    return this.http.fetch(department.linkEmployees)
      .then(response => response.json())
      .then(employees => {
        return this.collectEmployees(employees);
      });
  }

  saveEmployee(employee) {
    let http_method = "POST";
    let http_url = 'employees';

    if (employee.id) {
      http_method = "PATCH";
      http_url = `${http_url}/${employee.id}`;
    };

    console.log(JSON.stringify(employee.serialize()));

    return this.http.fetch(http_url, {
      method: http_method,
      body: JSON.stringify(employee.serialize())
    })
      .then(response => response.json())
      .then(employee => {
        return employee.data
      });
  };

  deleteEmployee(id) {
    return this.http.fetch(`employees/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        console.log(response);
      });
  }
}
