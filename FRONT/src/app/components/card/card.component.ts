import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';

import { ButtonAction, KanbamAction } from '../../enum/actions.enum';
import { CardDTO } from '../../interfaces/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public stage!: KanbamAction;
  @Input() public card!: CardDTO;
  @Output() public action: EventEmitter<{ action: ButtonAction, card: CardDTO }> = new EventEmitter();

  public buttonAction = ButtonAction;
  public edit: boolean = false;
  public editor!: Editor;
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    [{ heading: ['h5', 'h6'] }],
  ];
  public form = new FormGroup({
    conteudo: new FormControl({
      value: {
        type: "doc",
        content: []
      }, disabled: false
    }, Validators.required()),
    titulo: new FormControl('', Validators.required())
  });

  public ngOnInit(): void {
    this.editor = new Editor();
  }

  public ngOnChanges(): void {
    if (this.card) {
      this.form.patchValue(this.card);
    }
  }

  public ngOnDestroy(): void {
    this.editor.destroy();
  }

  public get title(): string {
    return this.form.get('titulo')?.value ?? '';
  }

  public placeholder(key: 'TITLE'): string {
    switch (key) {
      case 'TITLE':
        return !!this.title?.length ? this.title : 'Título';
      default:
        return '';
    }
  }

  public emit(action: ButtonAction): void {
    const card: CardDTO =
      this.stage === KanbamAction.NEW ?
        { conteudo: this.content, titulo: this.title, lista: KanbamAction.TO_DO } :
        { ...this.card, conteudo: this.content, titulo: this.title };
    this.action.emit({ action, card });
    this.reset();
    if (action === ButtonAction.CREATE) {
        this.edit = !this.edit;
    }
  }

  public reset(): void {
    this.form.reset(this.card);
  }

  public get content(): any {
    return this.form.get('conteudo')?.value;
  }
}
