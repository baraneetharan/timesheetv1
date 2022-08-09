import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartOptions, ChartType } from 'chart.js';

import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-userreport',
  templateUrl: './userreport.component.html',
  styleUrls: ['./userreport.component.css'],
})
export class UserreportComponent implements OnInit {
  // chart: any;
  public chart: Chart

  colors = [];
  tasks = [];
  allStatus = [];
  statusCount = [];
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.getAllTasks();
    this.getRandomColor();
  }

  getAllTasks() {
    let currentUser = localStorage.getItem('wsuser');
    this.taskService.getAllTasksService().subscribe((data: any[]) => {
      this.tasks = data.filter((x) => x.assigneto === currentUser);
      console.log(this.tasks);

      let inprogress = this.tasks.reduce((p, c) => {
        var status = c.status;
        if (!p.hasOwnProperty(status)) {
          p[status] = 0;
        }
        p[status]++;
        return p;
      }, {});

      var inprogressCounts = Object.keys(inprogress).map((k) => {
        return { status: k, count: inprogress[k] };
      });

      console.log('inprogressCounts --->');
      console.log(inprogressCounts);
      this.allStatus = inprogressCounts.map((a) => a.status);
      console.log(this.allStatus);
      this.statusCount = inprogressCounts.map((a) => a.count);
      console.log(this.statusCount);
      // this.doughnutChartLabels = this.allStatus;
      // this.doughnutChartData = this.statusCount;
      // this.doughnutChartColor = this.getRandomColor();

      // if (this.chart) this.chart.destroy(); //destroy prev chart instance

      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: this.allStatus,
          datasets: [
            {
              data: this.statusCount,
              backgroundColor: this.colors,
              // fill: false
            },
          ],
        },
      });
    });
  }

  getRandomColor() {
    // var letters = '0123456789ABCDEF'.split('');
    // var color = '#';
    // for (var i = 0; i < 4; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';

    for (var j = 0; j < 4; j++) {
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      this.colors.push(color);
      color = '#';
    }
    return this.colors;
  }
}
