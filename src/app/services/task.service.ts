import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../interface/ITask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5129/api/tasks';

  constructor(private http: HttpClient) {
  }


  // Listar todas as tarefas
  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  // Criar uma nova tarefa
  createTask(task: ITask): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  // Buscar uma tarefa específica
  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Atualizar uma tarefa existente
  updateTask(task: ITask): Observable<any> {
    return this.http.post(`${this.apiUrl}/${task.id}`, task);
  }

  // Excluir uma tarefa
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
