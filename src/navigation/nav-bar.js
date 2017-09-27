import {Aurelia} from 'aurelia-framework';
import {bindable, inject}  from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserApi} from '../services/user-api';
import {User}    from '../models/user';
import {CommonDialogs} from 'resources/dialogs/common-dialogs';
import {deleteCookie} from '../resources/helpers/cookies';

@inject(Aurelia, UserApi, Router, CommonDialogs)
export class NavBar {

  @bindable
    router;

  constructor(aurelia, userApi, router, commonDialogs) {
    this.simpleSearchTerm = "";
    this.aurelia = aurelia;
    this.userApi = userApi;
    this.router  = router;
    this.commonDialogs = commonDialogs;
  }
  
  
  simpleSearch() {
    //alert(this.simpleSearchTerm);
    this.router.navigateToRoute('departments', {"filter": this.simpleSearchTerm}, { replace: true, trigger: true });
  }
  
  logout() {
    const message = `Do you really want to log off!`;
    
    this.commonDialogs.showMessage(
      message,
      'Logging off',
      ['Yes', 'No']
      ).then(response => {
        if (!response.wasCancelled)
          this._doLogout();
        }
      );
  }

  _doLogout() {
    this.userApi.logout().then(() => {
      console.log("Logged out!");  
      deleteCookie({name: "empdept"});    
      this.aurelia.setRoot("login/login");
      this.router.reset();
      this.router.deactivate();
    });
   
  }
}
