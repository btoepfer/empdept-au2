export class App {

    configureRouter(config, router) {
        config.title = 'BCT';
        config.map([
            { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome/welcome', nav: true, title: 'Welcome' },
            { route: 'departments', name: 'departments', moduleId: './departments/departments', nav: true, title: 'Departments' },
            { route: 'department/:id', name: 'department', moduleId: './departments/department', nav: false, title: 'Department' }
        ]);

        this.router = router;
    }
}