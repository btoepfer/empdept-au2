export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  configureRouter(config, router) {
    config.title = 'BCT';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './resources/elements/welcome',      nav: true, title: 'Welcome' }
    ]);
    
    this.router = router;
  }
}
