import {inject} from 'aurelia-dependency-injection';
import {Aurelia} from 'aurelia-framework';
import {UserApi} from '../services/user-api';
import {User}    from '../models/user';
import {CommonDialogs} from 'resources/dialogs/common-dialogs';
import {createCookie} from '../resources/helpers/cookies';

@inject(Aurelia, UserApi, CommonDialogs)
export class Login {
  constructor(aurelia, userApi, commonDialogs) {
    this.aurelia = aurelia;
    this.userApi = userApi;
    this.email = 'bernd@bctoepfer.de';
    this.password = '00000000';
    this.message = '';
    this.commonDialogs = commonDialogs;
  }
  
  login() {
    this.userApi.login(this.email, this.password).then(user => {
      if (user) {
        //Track the logged in user and render the main app.
        //this.message = 'Success'
        //this.aurelia.use.instance(User, user);
        createCookie({name: "empdept", value: user.attributes.token, days: 0});

        const message = `You are logged in!`;
        
        this.commonDialogs.showTempMessage(
          message,
          'Logged In',
          ['OK'], 1000
          ).then();
          this.aurelia.setRoot();
      } else {
        this.message = 'Incorrect Username or Password!';
      }
    });
  }
}

