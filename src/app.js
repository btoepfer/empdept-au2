

export class App {

    configureRouter(config, router) {
        config.title = 'BCT';
        config.map([{
          route: ['', 'welcome'],
          name: 'welcome',
          moduleId: './welcome/welcome',
          nav: true,
          title: 'Welcome'
        },
        {
          route: 'departments',
          name: 'departments',
          moduleId: './departments/index',
          nav: true,
          title: 'Departments',
          settings: { icon:'file-text' }
        },
        ]);

        this.router = router;
    }
  

}
