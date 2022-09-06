import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss'],
})
export class TaskUpdateComponent implements OnInit {
  user: any;
  id: string = '';

  myForm: FormGroup = this.formBuilder.group({
    name: [''],
  });

  constructor(
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.taskService.user;
    this.activatedRoute.params.subscribe((params: any) => {
      this.myForm.setValue({ name: params.name });
      this.id = params.id;
    });
  }

  isDirty(val: string): boolean {
    return this.myForm.get(val)?.value.length > 0;
  }

  update() {
    this.taskService
      .update(this.id, this.myForm.value.name)
      .subscribe((res) => {
        this.router.navigateByUrl('/task');
      });
  }
}
