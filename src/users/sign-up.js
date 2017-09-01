import {User} from '../models/user';
import {bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserApi} from '../services/user-api';
import {inject, NewInstance} from 'aurelia-dependency-injection';
import {ValidationController, validateTrigger} from 'aurelia-validation';
import {SimpleValidationRenderer} from "../resources/validation/simple-validation-renderer";


@inject (Router, NewInstance.of(ValidationController), UserApi)
export class SignUp {

  @bindable 
    user;

  constructor(router, validationController, userApi) {
    this.router = router;
    this.validationController = validationController;
    this.validationController.addRenderer(new SimpleValidationRenderer());
    this.validationController.validateTrigger = validateTrigger.changeOrBlur;
    this.userApi = userApi;
    this.user = new User();    
  }

  signUp() {
    this.validationController.validate()
    .then(result => { 
      if (result.valid) {
        this.userApi.saveUser(this.user)
          .then(() => this.router.navigateToRoute('departments', { filter: "none"}))
          .catch(err => alert(err.statusText));
        this.validationController.reset()}
      });
  }
}
