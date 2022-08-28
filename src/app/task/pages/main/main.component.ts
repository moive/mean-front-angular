import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  tasks: Array<any> = [];
  user: any;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.taskService.user;
    this.taskService.all().subscribe((res) => {
      this.tasks = res.tasks;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('auth');
  }
}
