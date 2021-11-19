import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ProductService } from './product.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule, // desabilitar animações
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSortModule,
        MatSnackBarModule,
        MatCardModule,
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
      expect(component.products$).withContext('products$ iniciando com undefined').toBe(null);
      done()
    }

    (done: DoneFn) => {
      component.products$ = of([]).subscribe();
      component.ngOnDestroy();
      expect(component.products$).withContext('products$ iniciando com obvervable').toBe(null);
      done()
    }

  })

  it('deverá testar o método openDialog', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const acao = 'Adicionar';
    (done: DoneFn) => {
      component.openDialog(acao, {id:'1',name:'fake',price:1,quantity:1});
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.h1 strong')?.textContent).withContext('com css class').toContain(acao);
      expect(compiled.querySelector('#mat-dialog-title')?.textContent).withContext('com css id').toContain(acao);
      done()
    }
  })

});
