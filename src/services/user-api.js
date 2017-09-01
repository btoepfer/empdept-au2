import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { User } from '../models/user';
import {getCookie} from '../resources/helpers/cookies';

@inject(HttpClient)
export class UserApi {

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000/')
        .withDefaults({
          headers: {
            'content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            const token = getCookie({name: "empdept"});
            console.log(token);
            request.headers.append("Authorization", token);
            return request;
          }
        });
    });
    this.http = http;
  }

  collectUsers(users) {
    let users_list = [];
    let user;

    // returning an array of users
    users.data.forEach((user) => {
      user = new User(user);
      users_list.push(user);
    });
    return users_list;
  }

  getUsers() {
    let http_method = "GET";
    let http_url = 'users';


    return this.http.fetch(http_url, {
        method: http_method
      })
      .then(response => response.json())
        .then(users => {
          return this.collectUsers(users);
        })
      .catch(error => {
        let errorMessage = "";
        if (error.bodyUsed) {
          error.text()
            .then(errorText => {
              errorMessage = JSON.parse(errorText).errors[0].detail;
          })
        };
        alert(`${error.statusText} : ${error.status} - ${errorMessage}`);
        return null;
      })
  };
  
  
  saveUser(user) {

    let http_method = "POST";
    let http_url = 'users';


    return this.http.fetch(http_url, {
      method: http_method,
      body: JSON.stringify(user.serialize())
    })
      .then(response => console.log(response));

  };

  login(email, password) {
    let http_method = "POST";
    let http_url = 'users/login';
    let user = new User;
    user.attributes.password = password;
    user.attributes.email    = email;

    return this.http.fetch(http_url, {
      method: http_method,
      body: JSON.stringify(user.serialize())
    })
      .then(response => response.json())
      .then(user => {
        return user.data;
      })
  }

  logout() {
    let http_method = "POST";
    let http_url = 'users/logout';

    return this.http.fetch(http_url, {
      method: http_method,
      //body: JSON.stringify(user.serialize())
    })
      .then(response => response.json());
  }
 
}
