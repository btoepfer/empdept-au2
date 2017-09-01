import {User} from '../models/user';
import {bindable, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserApi} from '../services/user-api';

@inject(UserApi, Router)
export class userList {


  constructor(userApi, router) {
    this.userApi = userApi;
    this.users = [];
    this.router = router;
  }

  activate(model) {
    this.userApi.getUsers()
    .then(users => this.users = users);
  }
}
