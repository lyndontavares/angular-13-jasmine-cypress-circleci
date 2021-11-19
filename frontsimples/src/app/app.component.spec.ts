import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { ProductData } from './product-data.model';

describe('Teste do componente AppComponent', () => {

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
    fixture.detectChanges();
    component.ngOnDestroy();

    expect(component.products$).withContext('products$ inicialmente é undefined').toBe(null);
    component.products$ = of([]).subscribe();
    component.ngOnDestroy();
    expect(component.products$).withContext('atribuido observable a products$').toBe(null);
  })

  it('deverá testar o método openDialog', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const acao = 'Adicionar';
    fixture.detectChanges();
    component.openDialog(acao, { id: '1', name: 'fake', price: 1, quantity: 1 });
    fixture.detectChanges();
    tick();
    let title = document.getElementById('mat-dialog-title');
    expect(title.innerText).withContext('com element  id').toContain(acao);
    title = document.getElementsByTagName('h1')[0]
    expect(title.innerText).withContext('com element class').toContain(acao);
  }))

  it('verifica método calculaTotal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const produtos : ProductData[] = [{ id: 1, name: 'fake', price: 10, quantity: 10 }]
    const total = component.calculaTotal(produtos);
    expect(total).toBe(100);
  })

});
