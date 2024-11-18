import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Editor } from 'ngx-editor';

import { CardComponent } from './card.component';
import { DescriptionComponent } from '../description/description.component';
import { ButtonAction, KanbamAction } from '../../enum/actions.enum';
import { CardDTO } from '../../interfaces/card.model';
import { BoardService } from '../../services/board.service';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const title = 'titulo';
  const card: CardDTO = {
    id: '1234',
    titulo: 'titulo',
    conteudo: 'conteudo',
    lista: KanbamAction.DOING
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        DescriptionComponent
      ],
      imports: [
        RouterModule,
        MatIconModule,
        MatDividerModule,
        MatRippleModule,
        ReactiveFormsModule
      ],
      providers: [
        BoardService,
        provideHttpClient()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.stage = KanbamAction.TO_DO;
    fixture.detectChanges();
  });

  it('should test ngOnInit', () => {
    component.ngOnInit();
    const istanceOfEditor = component.editor instanceof Editor;
    expect(istanceOfEditor).toBe(true);
  });

  it('should test ngOnChanges', () => {
    component.card = card;
    component.ngOnChanges();
    expect(component.title).toBe(title);
  });

  it('should test ngOnDestroy', () => {
    const spyDestroy = spyOn(component.editor, 'destroy');
    component.ngOnDestroy();
    expect(spyDestroy).toHaveBeenCalled();
  });

  it('should test title', () => {
    component.form.get(title)?.setValue(title);
    expect(component.title).toBe(title);
  });

  it('should test content', () => {
    const obj = {
      type: 'doc',
      content: []
    };
    component.form.get('conteudo')?.setValue(obj);
    expect(component.content).toEqual(obj);
  });

  it('should test placeholder with value', () => {
    component.form.get(title)?.setValue(title);
    expect(component.placeholder('TITLE')).toBe(title);
  });

  it('should test placeholder without value', () => {
    expect(component.placeholder('TITLE')).toBe('Título');
  });

  it('should test placeholder without value', () => {
    expect(component.placeholder('' as any)).toBe('');
  });

  it('should test reset', () => {
    const spyReset = spyOn(component.form, 'reset');
    component.reset();
    expect(spyReset).toHaveBeenCalled();
  });

  it('should test reset 1st case', () => {
    component.card = card;
    component.edit = true;
    component.stage = KanbamAction.NEW;
    component.form.get('titulo')?.setValue(card.titulo);
    component.form.get('conteudo')?.setValue(card.conteudo);
    const spyReset = spyOn(component, 'reset');
    const spyEmit = spyOn(component.action, 'emit');
    component.emit(ButtonAction.CREATE);
    expect(spyReset).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith({
      card: { conteudo: card.conteudo, titulo: card.titulo, lista: KanbamAction.TO_DO },
      action: ButtonAction.CREATE
    });
    expect(component.edit).toBe(false);
  });

  it('should test reset 2nd case', () => {
    component.card = card;
    component.edit = true;
    component.stage = KanbamAction.TO_DO;
    component.form.get('titulo')?.setValue(card.titulo);
    component.form.get('conteudo')?.setValue(card.conteudo);
    const spyReset = spyOn(component, 'reset');
    const spyEmit = spyOn(component.action, 'emit');
    component.emit(ButtonAction.CREATE);
    expect(spyReset).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith({
      card,
      action: ButtonAction.CREATE
    });
    expect(component.edit).toBe(false);
  });

  it('should test get title with no value', () => {
    component.form.get('titulo')?.setValue(null);
    expect(component.title).toBe('');
  });
});
