import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ProductService } from './product.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
      declarations: [
        AppComponent,
        DialogBoxComponent
      ],
      providers: [
        ProductService
      ]
    }).compileComponents();
  });

  it('deverá testar criação do componente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deverá verificar título na view', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // por ID
    const title = fixture.debugElement.query(By.css('#title')).nativeElement.textContent;
    expect(title).toEqual('Angular Testing');

    // por classe
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Angular Testing');
  });


  it(`deverá testar método onInit'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'fetchData');
    component.ngOnInit();
    expect(component.fetchData).toHaveBeenCalled();
  });

  it(`deverá testar método onDestroy`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    (done: DoneFn) => {
      component.ngOnDestroy();
      expect(component.products$).toBe(null);
      done()
    }

    (done: DoneFn) => {
      component.products$ = of([]).subscribe();
      component.ngOnDestroy();
      expect(component.products$).toBe(null);
      done()
    }

  })

});
