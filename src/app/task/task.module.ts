import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MainComponent } from './pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskUpdateComponent } from './pages/task-update/task-update.component';

@NgModule({
  declarations: [MainComponent, TaskUpdateComponent],
  imports: [CommonModule, TaskRoutingModule, FormsModule, ReactiveFormsModule],
})
export class TaskModule {}
