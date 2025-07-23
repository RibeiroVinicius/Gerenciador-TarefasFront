import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarTaskComponent } from './modal-adicionar-task.component';

describe('ModalAdicionarTaskComponent', () => {
  let component: ModalAdicionarTaskComponent;
  let fixture: ComponentFixture<ModalAdicionarTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAdicionarTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdicionarTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
