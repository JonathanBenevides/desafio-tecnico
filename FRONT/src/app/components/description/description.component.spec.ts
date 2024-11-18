import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DescriptionComponent } from './description.component';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionComponent],
      imports: [],
      providers: [
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return a simple innerContent when array is empty', () => {
    const innerHTML = '<p>Descrição</p>';
    component.content = { content: [] };
    expect(component.innerContent).toBe(innerHTML);
  });

  it('should return a simple innerContent when array has some value', () => {
    const innerHTML = '<p>Descrição</p>';
    component.content = { content: [{}] };
    expect(component.innerContent).toBe(innerHTML);
  });

  it('should return a simple innerContent when array has some value', () => {
    component.innerContent = '';
    expect(component.innerContent).toBe('');
    component.content = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          attrs: {
            align: null,
            indent: null
          },
          content: [
            {
              type: "text",
              text: "text"
            }
          ]
        }
      ]
    };
    expect(component.innerContent).not.toBe('');
  });
});
