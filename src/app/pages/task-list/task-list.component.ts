import { Component, OnInit, ViewChild  } from '@angular/core';
import { ITask } from '../../interface/ITask';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: false
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'descricao', 'status', 'dataLimite', 'acoes'];
  dataSource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>();
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

  taskSelected: ITask | null = null;
  openModal: boolean = false;
  loading: boolean = false;
  searchText: string = '';
  statusFilter: string = '';
  dataInicio: Date | null = null;
  dataFim: Date | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (task, filter) => {
          const normalized = filter.trim().toLowerCase();
          return task.titulo.toLowerCase().includes(normalized);
        };
      },
      complete: () => this.loading = false
    });
  }
  applyFilters(): void {
    this.dataSource.filterPredicate = (task: ITask, _filter: string): boolean => {
      const normalizedSearch = this.searchText.trim().toLowerCase();

      const tituloMatch = task.titulo.toLowerCase().includes(normalizedSearch);
      const descricaoMatch = task.descricao?.toLowerCase().includes(normalizedSearch) ?? false;

      const statusMatch =
        this.statusFilter === '' ||
        (this.statusFilter === 'concluida' && task.concluida) ||
        (this.statusFilter === 'pendente' && !task.concluida);

      const dataLimite = new Date(task.dataLimite);
      const dentroDoPeriodo =
        (!this.dataInicio || dataLimite >= this.dataInicio) &&
        (!this.dataFim || dataLimite <= this.dataFim);

      return (tituloMatch || descricaoMatch) && statusMatch && dentroDoPeriodo;
    };

    this.dataSource.filter = `${Math.random()}`;
  }

  limparFiltros(): void {
    this.searchText = '';
    this.statusFilter = '';
    this.dataInicio = null;
    this.dataFim = null;
    this.applyFilters();
  }

  getStatus(status: boolean): string {
    return status ? 'Concluída' : 'Pendente';
  }

  editarTask(task: ITask): void {
    this.taskSelected = task;
    this.openModal = true;
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
        this.snackBar.open('Tarefa excluída com sucesso', 'Fechar', {
          duration: 3000
        });
      },
      error: () => {
        this.snackBar.open('Erro ao excluir tarefa', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  concluirTask(task: ITask): void {
    this.loading = true;
    task.concluida = !task.concluida;
    this.taskService.updateTask(task).subscribe(() => {
      this.loadTasks();
    });
  }

  openTaskModal(): void {
    this.taskSelected = null;
    this.openModal = true;
  }

  closeModal(): void {
    this.loadTasks();
    this.openModal = false;
    this.taskSelected = null;
  }

  logout(): void {
    this.dataSource.data = [];
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
