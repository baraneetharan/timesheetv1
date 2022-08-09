import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private url = 'https://shravantimesheet.herokuapp.com/api/worklogs/';
  
  // private url = 'http://localhost:8080/api/worklogs/';


  constructor(private httpClient: HttpClient) {}

  public getAllLogsService() {
    return this.httpClient.get(this.url);
  }
  public createLogService(log) {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(this.url, JSON.stringify(log), {
      headers: headers,
    });
  }
  public getLogService(id) {
    return this.httpClient.get(this.url + id);
  }
  public deleteLogService(id) {
    return this.httpClient.delete(this.url + id);
  }
  public updateLogService(id, log) {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.put(this.url + id, JSON.stringify(log), {
      headers: headers,
    });
  }
}
