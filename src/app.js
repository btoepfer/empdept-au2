import { activationStrategy } from 'aurelia-router';



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
          href: '#/departments?filter=none',
          settings: { icon:'users' },
          activationStrategy: activationStrategy.invokeLifecycle
        },
        {
          route: 'users',
          name: 'users',
          moduleId: './users/user-list',
          nav: true,
          title: 'Users',
          settings: { icon:'users' }
        },
        {
          route: 'users/sign-up',
          name: 'sign-up',
          moduleId: './users/sign-up',
          nav: true,
          title: 'Sign-Up',
          settings: { icon:'user' }
        },
        {
          route: 'login/logout',
          name: 'logout',
          moduleId: './login/logout',
          nav: true,
          title: 'Logout',
          settings: { icon:'window-close' }
        },
        ]);

        this.router = router;
    }
  

}
