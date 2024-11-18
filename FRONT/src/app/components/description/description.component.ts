import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { toHTML } from 'ngx-editor';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionComponent {

  public innerContent: SafeHtml = '';

  constructor(public sanitizer: DomSanitizer) { }

  @Input() set content(value: any) {
    if (!!!value?.content.length || !value.content[0].content) {
      this.innerContent = '<p>Descrição</p>';
      return;
    }
    this.innerContent = this.sanitizer.bypassSecurityTrustHtml(toHTML(value));
  }
}
