import {activationStrategy} from 'aurelia-router';
import { bindable, inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import { DepartmentApi } from '../services/department-api';
import { Department } from './department';

@inject(DepartmentApi, EventAggregator)
export class Departments {

  constructor(departmentApi, ea) {
    this.departments = [];
    this.filteredDepartments = [];
    this.filterTerm = "";
    this.departmentApi = departmentApi;
    this.ea = ea;

    this.createdSubscription = this.ea.subscribe('department:created', department => this.departmentCreated(department));
    this.updatedSubscription = this.ea.subscribe('department:updated', department => this.departmentUpdated(department));
  }

  configureRouter(config, router) {
    config.map([
      { route: '', moduleId: './no-selection' },
      { route: ':id', moduleId: './department', name: 'department'
        //, activationStrategy: activationStrategy.invokeLifecycle
      },
      { route: 'new', moduleId: './new', nav: true, title: 'Add Department', settings: { icon:'plus', 'title':'Add' } },
      { route: 'edit', moduleId: 'notebooks/index', nav: true, title: 'Notebooks', href: '#/departments/:id', settings: { icon:'pencil' } },
      { route: 'delete', moduleId: 'notebooks/index', nav: true, title: 'Notebooks', settings: { icon:'trash' } },
      { route: 'settings',  moduleId: 'settings/index', nav: true, title: 'Settings', settings: { icon:'cog' } }
    ]);

    this.deptRouter = router;
  }

  activate() {
      console.log("View activated");
      this.departmentApi.getDepartments()
        .then(departments => this.filteredDepartments = departments)
        .then(()=>{console.log(this.filteredDepartments)});
  }

  departmentCreated(department) {
    this.filteredDepartments.push(department);
    //this.departmentApi.getDepartments().then(departments => this.filteredDepartments = departments);
  }

  departmentUpdated(department) {
    let i = this.filteredDepartments.findIndex(d => {
      return d.id === department.id
    });
    //this.filteredDepartments[i] = JSON.parse(JSON.stringify(department));
    this.filteredDepartments[i].attributes.dname = department.attributes.dname;
    this.filteredDepartments[i].attributes.loc = department.attributes.loc;
    //this.departmentApi.getDepartments().then(departments => this.filteredDepartments = departments);
  }

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



  editDepartment(id) {
    alert(`Department: ${id} edited.`);
  }

  deleteDepartment(id) {
    alert(`Department: ${id} deleted.`);
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
