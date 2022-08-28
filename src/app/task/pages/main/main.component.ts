import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  tasks: Array<any> = [];
  user: any;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.user = this.taskService.user;
    this.taskService.all().subscribe((res) => {
      this.tasks = res.tasks;
    });
  }
}
