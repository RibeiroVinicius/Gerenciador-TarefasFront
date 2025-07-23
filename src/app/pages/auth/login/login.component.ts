import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserLogin } from '../../../interface/IUserLogin';
import { LoginService } from '../../../services/login.service';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';
  creationError: boolean = false;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.loginForm = this.fb.group({
      usuario: ["", Validators.nullValidator],
      senha: ["", Validators.nullValidator]
    });
  }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      usuario: ["", Validators.nullValidator],
      senha: ["", Validators.nullValidator]
    });
  }
  login() {
    this.loading = true;
    const user: IUserLogin = {
      usuario: this.loginForm.value.usuario,
      senha: this.loginForm.value.senha
    };

    if (!this.validarFormLogin()) {
      this.loading = false;
      return;
    } else {
      this.loginService.login(user)
        .pipe(
          catchError(error => {
            this.tratarErros(error);
            throw error;
          })
        ).subscribe(data => {
          if (data) {
            localStorage.setItem('authToken', data.token); // Salva o token no localStorage
            this.router.navigate(['/task-list']); // Redireciona para a lista de tarefas
          }
          this.loading = false;
        });
    }
  }

  validarFormLogin(): boolean {
    let credenciaisValidas = true;
    if (this.loginForm.get('usuario')?.value.length == 0) {
      this.mensagens("Informe o usuário");
      credenciaisValidas = false;
    } else if (this.loginForm.get('senha')?.value.length == 0) {
      this.mensagens("Informe a senha");
      credenciaisValidas = false;
    }
    return credenciaisValidas;
  }

  tratarErros(error: any) {
    if (error.status == 401) {
      this.mensagens("Usuário ou senha incorretos");
    } else if (error.status == 500) {
      this.mensagens("Erro no servidor");
    } else if (error.status == 0) {
      this.mensagens("Erro de conexão conexão com o servidor");
    } else if (error.status == 404) {
      this.mensagens("Não encontrado");
    }
  }

  private mensagens(message: string): void {
    this.snackBar.open(message, 'Fechar', { duration: 3000 });
    this.loading = false;
  }
}
