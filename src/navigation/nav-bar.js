import {bindable, inject}  from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class NavBar {

  @bindable
    router;

  constructor(router) {
    this.simpleSearchTerm = "";
    this.router = router;
  }
  
  
  simpleSearch() {
    //alert(this.simpleSearchTerm);
    this.router.navigateToRoute('departments', {"filter": this.simpleSearchTerm}, { replace: true, trigger: true });
  }
  
}
