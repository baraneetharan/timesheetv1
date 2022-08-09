import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { distinct } from 'rxjs/operators';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  alltasks = [];
  tasks = [];
  uniqueStatus = [];
  uniqueNames = [];
  countCompleted;
  countInprogress;
  countNotStarted;
  users = [];

  barChartData = [];
  // barChartData = [
  //   { data: [2, 1, 0], label: 'In Progress' },
  //   { data: [2, 1, 1], label: 'Completed' },
  // ];

  barChartLabels;
  barChartType = 'bar';
  barChartLegend = true;
  barChartOptions;
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {}
  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  ngOnInit() {
    let currentUserRole = localStorage.getItem('wsuserRole');
    if (currentUserRole === 'Admin') {
      this.getAllUsers();
      this.barChartOptions = {
        scaleShowVerticalLines: true,
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                steps: 2,
                stepValue: 2,
                max: 20,
                min: 0,
              },
            },
          ],
        },
      };
      this.getAllTasks();
    } else {
      this.router.navigate(['/userreport']);
    }
  }

  //   let missed = a1
  //         .filter((x) => x.status == null && new Date().toISOString().slice(0, 10)<x.duedate)
  //         .map((a) => a.duedate);
  // console.log(missed);

  getAllUsers() {
    this.userService.getAllUsersService().subscribe((data: any[]) => {
      console.log(data);
      this.users = data;
    });
  }

  getAllTasks() {
    this.taskService.getAllTasksService().subscribe((data: any[]) => {
      // console.log(data);
      this.alltasks = data;
      this.uniqueStatus = [...new Set(this.tasks.map((x) => x.status))];
      // let getUniqueNames = [...new Set(this.tasks.map((x) => x.assigneto))];
      let getUniqueNames = [...new Set(this.users.filter(x=>x.role!="Admin").map((x) => x.name))];
      console.log(this.uniqueNames);
      this.uniqueNames = getUniqueNames.sort((a, b) => (a > b ? 1 : -1));
      console.log(this.uniqueNames);

      this.tasks = this.alltasks.filter((item) => {
        return this.uniqueNames.find((n) => {
          return n === item.assigneto;
        });
      });

      console.log('this.tasks');
      console.log(this.tasks);

      this.barChartLabels = this.uniqueNames;
      this.countCompleted = this.tasks.filter((x) => x.status === 'Completed');
      // console.log(this.countCompleted);

      //
      let completed = this.tasks
        .filter((x) => x.status === 'Completed')
        .reduce((p, c) => {
          var assignee = c.assigneto;
          if (!p.hasOwnProperty(assignee)) {
            p[assignee] = 0;
          }
          p[assignee]++;
          return p;
        }, {});

      var completedCounts = Object.keys(completed).map((k) => {
        return { name: k, count: completed[k] };
      });

      // console.log('completedCounts --->');
      // console.log(completedCounts);

      let completedUsers = this.tasks
        .filter((x) => x.status === 'Completed')
        .map((a) => a.assigneto);
      // console.log('Completed users ----->');
      // console.log(completedUsers);

      // let completedZero = this.uniqueNames.filter(
      //   (x) => !completedUsers.includes(x)
      // );

      let completedZero = this.uniqueNames.filter(function (n) {
        return completedUsers.indexOf(n) == -1;
      });

      // console.log('completedZero -------->');

      // console.log(completedZero.map((x) => ({ name: x, count: 0 })));

      let completedUnion = [
        ...completedCounts,
        ...completedZero.map((x) => ({ name: x, count: 0 })),
      ];
      console.log('completedUnion----->');
      console.log(completedUnion);
      let completedData = completedUnion.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      // console.log('Completed Values----->');

      let completedValues = {
        data: completedData.map((x) => x.count),
        label: 'Completed',
      };

      // console.log(completedValues);
      // Inprogress

      this.countInprogress = this.tasks.filter(
        (x) => x.status === 'Inprogress'
      );
      // console.log(this.countInprogress);

      //
      let inprogress = this.tasks
        .filter((x) => x.status === 'Inprogress')
        .reduce((p, c) => {
          var assignee = c.assigneto;
          if (!p.hasOwnProperty(assignee)) {
            p[assignee] = 0;
          }
          p[assignee]++;
          return p;
        }, {});

      var inprogressCounts = Object.keys(inprogress).map((k) => {
        return { name: k, count: inprogress[k] };
      });

      // console.log('inprogressCounts --->');
      // console.log(inprogressCounts);

      let inprogressUsers = this.tasks
        .filter((x) => x.status === 'Inprogress')
        .map((a) => a.assigneto);
      // console.log('Inprogress users ----->');
      // console.log(inprogressUsers);

      // let completedZero = this.uniqueNames.filter(function (n) {
      //   return completedUsers.indexOf(n) > -1;
      // });

      // console.log('completedZero -------->');

      // console.log(completedZero.map((x) => ({ name: x, count: 0 })));
      // let inprogressZero = this.uniqueNames.filter(
      //   (x) => !inprogressUsers.includes(x)
      // );

      let inprogressZero = this.uniqueNames.filter(function (n) {
        return inprogressUsers.indexOf(n) == -1;
      });

      // console.log('inprogressZero -------->');

      // console.log(inprogressZero.map((x) => ({ name: x, count: 0 })));

      let inprogressUnion = [
        ...inprogressCounts,
        ...inprogressZero.map((x) => ({ name: x, count: 0 })),
      ];
      console.log('inprogressUnion----->');
      console.log(inprogressUnion);
      let inprogressData = inprogressUnion.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      // console.log('Inprogress Values----->');

      let inprogressValues = {
        data: inprogressData.map((x) => x.count),
        label: 'Inprogress',
      };

      // console.log(inprogressValues);

      // NotStarted
      this.countNotStarted = this.tasks.filter(
        (x) => x.status === 'NotStarted' || x.status === null
      );
      // console.log(this.countInprogress);

      //
      let notStarted = this.tasks
        .filter((x) => x.status === 'NotStarted' || x.status === null)
        .reduce((p, c) => {
          var assignee = c.assigneto;
          if (!p.hasOwnProperty(assignee)) {
            p[assignee] = 0;
          }
          p[assignee]++;
          return p;
        }, {});

      var notStartedCounts = Object.keys(notStarted).map((k) => {
        return { name: k, count: notStarted[k] };
      });

      // console.log('notStartedCounts --->');
      // console.log(notStartedCounts);

      let notStartedUsers = this.tasks
        .filter((x) => x.status === 'NotStarted' || x.status === null)
        .map((a) => a.assigneto);

      //   let notStartedUsers1 = this.tasks
      //   .filter((x) => x.status === null)
      //   .map((a) => a.assigneto);
      // // console.log('Inprogress users ----->');
      // console.log(notStartedUsers1);

      // let notStartedZero = this.uniqueNames.filter(
      //   (x) => !notStartedUsers.includes(x)
      // );

      let notStartedZero = this.uniqueNames.filter(function (n) {
        return notStartedUsers.indexOf(n) == -1;
      });

      // console.log('notStartedZero -------->');

      // console.log(notStartedZero.map((x) => ({ name: x, count: 0 })));

      let notStartedUnion = [
        ...notStartedCounts,
        ...notStartedZero.map((x) => ({ name: x, count: 0 })),
      ];
      console.log('notStartedUnion----->');
      let notStartedData = notStartedUnion.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      console.log(notStartedData);

      // console.log('Inprogress Values----->');

      let notStartedValues = {
        data: notStartedData.map((x) => x.count),
        label: 'NotStarted',
      };

      // console.log(notStartedValues);
      this.barChartData.push(completedValues);
      this.barChartData.push(inprogressValues);
      this.barChartData.push(notStartedValues);
      //
    });
    //   public barChartOptions = {
    //   scaleShowVerticalLines: false,
    //   responsive: true,
    // };
  }
}
