import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../../interface/ITask';
import { TaskService } from '../../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-adicionar-task',
  templateUrl: './modal-adicionar-task.component.html',
  styleUrls: ['./modal-adicionar-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAdicionarTaskComponent implements OnInit {
  formTask!: FormGroup;
  _taskSelected: ITask | null = null;
  loading: boolean = false;

  @Input() openModal: boolean = false;

  @Input() set taskSelected(task: ITask | null) {
    this._taskSelected = task;
    this.createForm(task); // Recria o form ao receber a task
  }

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() createTaskEvent = new EventEmitter<ITask>();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this._taskSelected) {
      this.createForm();
    }
  }

  /** Cria ou recria o formulário */
  createForm(task: ITask | null = null): void {
    this.formTask = this.fb.group({
      titulo: [task?.titulo || '', Validators.required],
      descricao: [task?.descricao || ''],
      dataLimite: [task?.dataLimite || '', [Validators.required, this.dataFuturaValidator]],
      concluida: [task?.concluida ?? false]
    });
  }

  /** Validador customizado para datas futuras */
  dataFuturaValidator(control: any) {
    const data = new Date(control.value);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return data > hoje ? null : { dataInvalida: true };
  }

  /** Submete o formulário */
  saveTask(): void {
    if (this.formTask.invalid) {
      this.formTask.markAllAsTouched();
      return;
    }

    this.loading = true;
    if (this._taskSelected) {
      const task: ITask = this.formTask.value;
      task.id = this._taskSelected.id; // Preserva o ID da tarefa selecionada
      this.taskService.updateTask(task).subscribe({
        next: () => this.onSuccess('Tarefa atualizada!'),
        error: () => this.onSuccess('Erro ao salvar tarefa!')
      });
    } else {
      this.taskService.createTask(this.formTask.value).subscribe({
        next: () => this.onSuccess('Tarefa criada com sucesso!'),
        error: () => this.onSuccess('Erro ao criar tarefa!')
      });
    }
  }

  /** Fechar o modal e limpar o form */
  closeModal(): void {
    this.openModal = false;
    this._taskSelected = null;
    this.createForm();
    this.closeModalEvent.emit();
  }

  /** Exibir status da tarefa */
  getStatus(status: boolean): string {
    return status ? 'Concluída' : 'Pendente';
  }

  /** Método chamado ao sucesso de criação ou atualização */
  private onSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', { duration: 3000 });
    this.closeModal();
    this.loading = false;
  }
}
