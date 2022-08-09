import { Component, OnInit } from '@angular/core';
import { LogService } from '../log/log.service';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';
import { User } from '../user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // model = new User();
  tasks = [];
  logs = [];
  currentUser;
  currentUserRole;
  notStartedTasks = [];
  completedTasks = [];
  inProgressTasks = [];
  acknowledgedTasks = [];
  lateTasks = [];
  hoursWorked;
  logWithTimeSpent = [];
  totalHrs = [];
  isShown: boolean = true; // hidden by default
  currentStrip = 'All';
  model = new Task();


  constructor(
    private taskService: TaskService,
    private logService: LogService
  ) {}

  ngOnInit() {
    this.currentUser = localStorage.getItem('wsuser');
    this.currentUserRole = localStorage.getItem('wsuserRole');
    this.getAllTasks();
    this.getAllLogs();
    // this.getAllLogsFindTimeSpent();
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  getAllTasks() {
    this.taskService.getAllTasksService().subscribe((data: any[]) => {
      if (this.currentUserRole === 'Admin') {
        this.tasks = data;
      } else {
        this.tasks = data.filter((x) => x.assigneto === this.currentUser);
      }
      console.log(this.tasks);
      this.notStartedTasks = this.tasks.filter(
        (x) => x.status == null || x.status === 'NotStarted'
      );
      this.completedTasks = this.tasks.filter((x) => x.status === 'Completed');
      this.inProgressTasks = this.tasks.filter(
        (x) => x.status === 'InProgress'
      );
      this.acknowledgedTasks = this.tasks.filter(
        (x) => x.status === 'Acknowledged'
      );

      console.log('notStartedTasks ' + this.notStartedTasks.length);
      console.log('completedTasks ' + this.completedTasks.length);
    });
  }

  getAllLogsFindTimeSpent() {
    // let currentUserLog = localStorage.getItem('wsuser');
    this.logService.getAllLogsService().subscribe((data: any[]) => {
      if (this.currentUserRole === 'Admin') {
        this.logWithTimeSpent = data;
      } else {
        this.logWithTimeSpent = data.filter(
          (x) => x.empname === this.currentUser
        );
      }

      console.log(this.logWithTimeSpent);
    });
    this.getTotalHours();
  }

  getAllLogs() {
    // let currentUserLog = localStorage.getItem('wsuser');
    this.logService.getAllLogsService().subscribe((data: any[]) => {
      console.log(data);
      if (this.currentUserRole === 'Admin') {
        this.logs = data;
        this.logWithTimeSpent = data;
      } else {
        this.logs = data.filter((x) => x.empname === this.currentUser);
        this.logWithTimeSpent = data.filter(
          (x) => x.empname === this.currentUser
        );
      }
      this.lateTasks = this.tasks.filter((task) => {
        return this.logs.find((log) => {
          return (
            // task.assigneto === log.empname &&
            log.date > task.duedate &&
            task.status === 'Completed' &&
            log.status === 'Completed'
          );
        });
      });
      // logWithTimeSpent
      this.totalHrs = this.logWithTimeSpent.map((a, b) => ({
        stime: a.stime,
        etime: a.etime,
        s: new Date(a.date).setHours(
          a.stime.split(':')[0],
          a.stime.split(':')[0]
        ),
        e: new Date(a.date).setHours(
          a.etime.split(':')[0],
          a.etime.split(':')[1]
        ),
        diff: this.msToTime(
          new Date(a.date).setHours(
            a.etime.split(':')[0],
            a.etime.split(':')[1]
          ) -
            new Date(a.date).setHours(
              a.stime.split(':')[0],
              a.stime.split(':')[1]
            )
        ),
      }));
      // logWithTimeSpent ends
      console.log(this.lateTasks.length);
      console.log('totalHrs ---> ');
      console.log(this.totalHrs);
      this.hoursWorked = this.addTimes(this.totalHrs.map((x) => x.diff));
      console.log(this.hoursWorked);
    });
  }

  acknowledgeTask(id) {
    // const x=this.tasks.filter(x=>x.id===id);
    var foundIndex = this.tasks.findIndex((x) => x.id == id);
    this.tasks[foundIndex].status = 'Acknowledged';
    console.log(id);
    console.log(this.tasks[foundIndex]);
    let updateTask = this.tasks[foundIndex];
    this.model=this.tasks[foundIndex];
    console.log(updateTask);
    this.taskService
      .updateTaskServiceFromDashboard(id, this.model)
      .subscribe((data) => {
        this.getAllTasks();
      });
  }

  getTotalHours() {
    console.log('getTotalHours calling ...');
    // this.logService.getAllLogsService().subscribe((data: any[]) => {
    //   this.logWithTimeSpent = data.filter(
    //     (x) => x.empname === this.currentUser
    //   )});

    // this.logService.getAllLogsService().subscribe((data: any[]) => {
    //   console.log(data);
    //   this.logWithTimeSpent = data.filter((x) => x.empname === this.currentUser);
    // });

    console.log('logWithTimeSpent ---> ');
    console.log(this.logWithTimeSpent);

    this.logWithTimeSpent.map((a, b) => ({
      stime: a.stime,
      etime: a.etime,
      s: new Date(a.date).setHours(
        a.stime.split(':')[0],
        a.stime.split(':')[0]
      ),
      e: new Date(a.date).setHours(
        a.etime.split(':')[0],
        a.etime.split(':')[1]
      ),
      diff: this.msToTime(
        new Date(a.date).setHours(
          a.etime.split(':')[0],
          a.etime.split(':')[1]
        ) -
          new Date(a.date).setHours(
            a.stime.split(':')[0],
            a.stime.split(':')[1]
          )
      ),
    }));

    // var diffArray = this.logWithTimeSpent.map((x) => x.diff);

    console.log('tHrs ---> ');
    // console.log(this.addTimes(diffArray));
    this.hoursWorked = this.addTimes(this.logWithTimeSpent.map((x) => x.diff));
    console.log('this.hoursWorked ---> ');
    console.log(this.hoursWorked);
  }

  msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? 0 + hours : hours;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    seconds = seconds < 10 ? 0 + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
  }
  addTimes(timeArray) {
    var mins = timeArray.reduce((acc, time) => {
      var [h, m] = time.split(':');
      acc += h * 60 + m * 1;
      return acc;
    }, 0);
    return ((mins / 60) | 0) + ':' + ('0' + (mins % 60)).slice(-2);
  }
}
