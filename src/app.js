

export class App {

    configureRouter(config, router) {
        config.title = 'BCT';
        config.map([{
          route: ['', 'welcome'],
          name: 'welcome',
          moduleId: './welcome/welcome',
          nav: true,
          title: 'Welcome',
          settings: { icon:'flag' }
        },
        {
          route: 'departments',
          name: 'departments',
          moduleId: './departments/index',
          nav: true,
          title: 'Departments',
          settings: { icon:'users' }
        },
        ]);

        this.router = router;
    }
  

}
