import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks = [];
  users = [];
  model = new Task();
  deleteid = 0;
  public defaultSelect = 'default';

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    let currentUserRole = localStorage.getItem('wsuserRole');
    if (currentUserRole === 'Admin') {
      this.getAllUsers();
      this.getAllTasks();
    } else {
      this.router.navigate(['/accessdenied']);
    }
  }

  getAllUsers() {
    this.userService.getAllUsersService().subscribe((data: any[]) => {
      console.log(data);
      this.users = data.filter((x) => x.role == 'User');
    });
  }

  getAllTasks() {
    this.taskService.getAllTasksService().subscribe((data: any[]) => {
      console.log(data);
      this.tasks = data;
    });
  }

  addTask() {
    if (!this.model.id) {
      // alert(this.model);
      console.log(this.model);
      this.taskService.createTaskService(this.model).subscribe((data) => {
        this.getAllTasks();
        this.model = new Task();
        document.getElementById('addTaskModal').click();
      });
    } else {
      console.log(this.model);
      this.taskService
        .updateTaskService(this.model.id, this.model)
        .subscribe((data) => {
          this.getAllTasks();
          this.model = new Task();
          document.getElementById('editTaskModal').click();
        });
    }
  }
  editTask(id) {
    // alert(id);
    this.taskService.getTaskService(id).subscribe((data: any) => {
      this.model = data;
    });
  }

  // a(id1)
  deleteTask(id) {
    // alert(id);
    this.deleteid = id;
  }
  remove() {
    this.taskService.deleteTaskService(this.deleteid).subscribe((data) => {
      this.getAllTasks();
      this.deleteid = 0;
      document.getElementById('deleteTaskModal').click();
    });
  }
}
