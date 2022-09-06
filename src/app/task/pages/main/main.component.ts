import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  tasks: Array<any> = [];
  user: any;
  newTask: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.taskService.user;
    this.taskService.all().subscribe((res) => {
      this.tasks = res.tasks;
    });
  }

  create() {
    this.taskService.create(this.newTask).subscribe((r) => {
      this.taskService.all().subscribe((res) => {
        this.tasks = res.tasks;
        this.newTask = '';
      });
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('auth');
  }

  delete(id: string) {
    this.taskService.delete(id).subscribe((response) => {
      this.taskService.all().subscribe((res) => {
        this.tasks = res.tasks;
      });
    });
  }

  update(task: any) {
    const { _id, name } = task;
    this.router.navigateByUrl(`/task/${_id}/${name}`);
  }
}
