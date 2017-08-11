export class EmployeeNew {
  attached() {
    $("#empno").focus();
  }

  addEmployee() {
    //alert(`Add Employee: ${this.department.id}.`);
    this.employee.department_id = this.department.id;
    let emp = this.employee;

    this.departmentApi.saveEmployee(emp)
      .then(response => this.departmentApi.getEmployees(this.department.id)
        .then(employees => {
          this.employees = employees;
          this.employee = this.clearEmployee();
          $("#empno").focus();
        })
      )
      .catch(err => alert(err.statusText));
  }
}
