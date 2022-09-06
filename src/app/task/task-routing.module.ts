import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { TaskUpdateComponent } from './pages/task-update/task-update.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: ':id/:name',
    component: TaskUpdateComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
