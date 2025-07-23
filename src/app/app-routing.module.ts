import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redireciona para login na inicialização
  { path: 'login', component: LoginComponent },  // Rota para login
  { path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard] }  // Rota para a lista de tarefas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
