import { activationStrategy } from 'aurelia-router';
import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DepartmentApi } from '../services/department-api';

@inject(DepartmentApi, EventAggregator)
export class Departments {

  constructor(departmentApi, ea) {
    this.departments = [];
    this.filteredDepartments = [];
    this.filterTerm = "";
    this.departmentApi = departmentApi;
    this.ea = ea;
    this.filter = 'none';

    this.createdSubscription = this.ea.subscribe('department:created', department => this.departmentCreated(department));
    this.updatedSubscription = this.ea.subscribe('department:updated', department => this.departmentUpdated(department));
  }

  configureRouter(config, router) {

    config.map([
      {
        route: '',
        moduleId: './no-selection'
      },
      {
        route: ':id',
        name: 'department',
        moduleId: './department',
        activationStrategy: activationStrategy.replace
      },
      {
        route: 'new',
        name: 'new',
        moduleId: './new',
        nav: true,
        title: 'Add Department',
        settings: { icon: 'plus', 'title': 'Add' }
      },
      {
        route: 'employees/new',
        name: 'employee-new',
        moduleId: '../employees/employee-new',
        nav: true,
        title: 'Add Employee',
        settings: { icon: 'user-plus', 'title': 'Add' }
      },
      {
        route: ':id/employees/new',
        name: 'employee-new-for-department',
        href: '#/departments/:id/employees/new',
        moduleId: '../employees/employee-new',
        nav: false
      },
      {
        route: 'settings',
        moduleId: 'settings/index',
        nav: true,
        title: 'Settings',
        settings: { icon: 'cog' }
      }
    ]);

    this.deptRouter = router;
  }

  // Departments werden gelesen
  activate(params) {
    this.filter = params.filter ? params.filter : this.filter;
    this.departmentApi.getDepartments(this.filter)
      .then(departments => this.filteredDepartments = departments)
      .then(() => { console.log(this.filteredDepartments) });
  }

  // Nach dem Erstellen eines neuen Departments wird über den
  // EventAggregator getriggerd, diese Funktion aufgerufen
  departmentCreated(department) {
    this.filteredDepartments.push(department);
    //this.departmentApi.getDepartments().then(departments => this.filteredDepartments = departments);
  }

  // Nach dem Ändern eines neuen Departments wird Ã¼ber den
  // EventAggregator getriggerd, diese Funktion aufgerufen
  departmentUpdated(department) {
    let i = this.filteredDepartments.findIndex(d => {
      return d.id === department.id
    });
    this.filteredDepartments[i].attributes.dname = department.attributes.dname;
    this.filteredDepartments[i].attributes.loc = department.attributes.loc;
  }

  // Es wird in allen Departments gesucht, dazu werden diese beim ersten Aufruf
  // alle Ã¼bertragen
  filterDepartments(filterTerm) {
    if (this.departments.length === 0)
      this.departments = this.filteredDepartments;

    this.filteredDepartments = this.departments.filter(department => {
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




  created() {
    console.log("View created");
  }

  bind() {
    console.log("Data binded between model and view");
  }

  attached() {
    console.log("View attached to the DOM");
  }

  detached() {
    this.createdSubscription.dispose();
    this.updatedSubscription.dispose();
  }

  unbind() {
    console.log("Data unbinded");
  }

  // Navigation Lifecycle

  canDeactivate() {
    console.log("Deactivation: true");
    return true;
  }

  canActivate() {
    console.log("Activation: true");
    return true;
  }

  deactivate() {
    console.log("View deactivated");
    return true;
  }





}
