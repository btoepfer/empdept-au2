export class App {

  configureRouter(config, router) {
    config.title = 'BCT';
    config.map([
      { route: ['', 'welcome'],  name: 'welcome',       moduleId: './resources/elements/welcome',                    nav: true, title: 'Welcome' },
      { route: 'departments',    name: 'departments',   moduleId: './resources/elements/departments/departments',    nav: true, title: 'Departments' },
      { route: 'department/:id', name: 'department',    moduleId: './resources/elements/departments/department',     nav: false, title: 'Department' }
    ]);
    
    this.router = router;
  }
}
