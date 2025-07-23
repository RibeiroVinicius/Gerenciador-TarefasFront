import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent {
  title = 'gerenciador-tarefas-frontend';

  constructor(private router: Router) { }

}
