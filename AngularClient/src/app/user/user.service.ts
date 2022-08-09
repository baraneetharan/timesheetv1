import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://shravantimesheet.herokuapp.com/api/users/';

  // private url = 'http://localhost:8080/api/users/';

  constructor(private httpClient: HttpClient) {}

  public getAllUsersService() {
    return this.httpClient.get(this.url);
  }

  public validate(user) {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(
      this.url + 'uservalidation',
      JSON.stringify(user),
      {
        headers: headers,
      }
    );
  }

  public createUserService(user) {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(this.url, JSON.stringify(user), {
      headers: headers,
    });
  }
  public getUserService(id) {
    return this.httpClient.get(this.url + id);
  }
  public deleteUserService(id) {
    return this.httpClient.delete(this.url + id);
  }
  public updateUserService(id, user) {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.put(this.url + id, JSON.stringify(user), {
      headers: headers,
    });
  }
}
