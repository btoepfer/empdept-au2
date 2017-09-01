import {inject} from 'aurelia-dependency-injection';
import {Aurelia} from 'aurelia-framework';
import {Router, Redirect} from 'aurelia-router';
import {UserApi} from '../services/user-api';
import {User}    from '../models/user';
import {deleteCookie} from '../resources/helpers/cookies';

@inject(Aurelia, UserApi, Router)
export class logout {
  constructor(aurelia, userApi, router) {
    this.aurelia = aurelia;
    this.userApi = userApi;
    this.router  = router;
  }

  logout() {
    deleteCookie({name: "empdept"});
    this.userApi.logout().then(() => {
      console.log("Logged out!");      
    });
    this.aurelia.setRoot("login/login");
    // this.router.navigateToRoute('welcome', { }, { replace: true, trigger: true });
  }

  activate() {
    this.logout();
  }

}
