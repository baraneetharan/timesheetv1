import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'https://shravantimesheet.herokuapp.com/api/alltasks/';
  // private url = 'http://localhost:8080/api/alltasks/';

  constructor(private httpClient: HttpClient) {}

  public getAllTasksService() {
    return this.httpClient.get(this.url);
  }
  public createTaskService(task) {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(this.url, JSON.stringify(task), {
      headers: headers,
    });
  }
  public getTaskService(id) {
    return this.httpClient.get(this.url + id);
  }
  public deleteTaskService(id) {
    return this.httpClient.delete(this.url + id);
  }
  public updateTaskService(id, task) {
    console.log(id);
    console.log(task);
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.put(this.url + id, JSON.stringify(task), {
      headers: headers,
    });
  }

  public updateTaskServiceFromDashboard(id, task) {
    console.log(id);
    console.log(task);
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.put(this.url + id, JSON.stringify(task), {
      headers: headers,
    });
  }
}
