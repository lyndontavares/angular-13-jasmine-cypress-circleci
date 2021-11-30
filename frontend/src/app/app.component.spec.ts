import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
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
import { ProductService } from './product.service';

describe('Teste do componente AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let productServiceStub: Partial<ProductService> = {
    read: () => of<ProductData[]>([{ id: 1, name: 'PRODUTO FAKE', price: 10, quantity: 10 }]),
    create: () => of({ id: 1, name: 'PRODUTO FAKE', price: 10, quantity: 10 }),
    update: () => of({ id: 1, name: 'PRODUTO FAKE', price: 10, quantity: 10 }),
    delete: () => of({ id: 1, name: 'PRODUTO FAKE', price: 10, quantity: 10 }),
    showMessage: () => { }
  };

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
        { provide: ProductService, useValue: productServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deverá testar criação do componente', () => {
    expect(component).toBeTruthy();
  });

  it('deverá verificar título na view', () => {
    // por ID
    const title = fixture.debugElement.query(By.css('#title')).nativeElement.textContent;
    expect(title).toEqual('Angular Testing');
    // por classe
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Angular Testing');
  });

  it(`deverá testar método onInit'`, () => {
    spyOn(component, 'fetchData');
    component.ngOnInit();
    expect(component.fetchData).toHaveBeenCalled();
  });

  it(`deverá testar método onDestroy`, () => {
    component.ngOnDestroy();
    expect(component.products$).toBe(null);
    component.products$ = of([]).subscribe();
    component.ngOnDestroy();
    expect(component.products$).toBe(null);
  })

  it('deverá testar o método openDialog', fakeAsync(() => {
    const acaoAdicionar = 'Adicionar';
    const acaoEditar = 'Editar';
    const acaoExcluir = 'Excluir';

    fixture.detectChanges();
    component.openDialog(acaoAdicionar, { id: '1', name: 'fake', price: 1, quantity: 1 });
    fixture.detectChanges();
    flush();  // espera o flush (simula passagem do tempo) do observable

    let title = document.getElementById('mat-dialog-title');
    expect(title.innerText).withContext('com element  id').toContain(acaoAdicionar);

    title = document.getElementsByTagName('h1')[0]
    expect(title.innerText).withContext('com element class').toContain(acaoAdicionar);

    let closeButton = document.getElementById('close-button');
    closeButton.click();
    fixture.detectChanges();
    flush();

    title = document.getElementById('mat-dialog-title');
    expect(title).toBe(null) //Cuidado, pois pode ser falso negativo

    fixture.detectChanges();
    component.openDialog(acaoAdicionar, { id: '1', name: 'fake', price: 1, quantity: 1 });
    fixture.detectChanges();
    flush();

    let actionButton = document.getElementById('action-button');
    actionButton.click();
    fixture.detectChanges();
    flush();

    title = document.getElementById('mat-dialog-title');
    expect(title).toBe(null)

    component.openDialog(acaoEditar, { id: '1', name: 'fake', price: 1, quantity: 1 });
    fixture.detectChanges();
    flush();

    actionButton = document.getElementById('action-button');
    actionButton.click();
    fixture.detectChanges();
    flush();

    title = document.getElementById('mat-dialog-title');
    expect(title).toBe(null)

    fixture.detectChanges();
    component.openDialog(acaoExcluir, { id: '1', name: 'fake', price: 1, quantity: 1 });
    fixture.detectChanges();
    flush();

    actionButton = document.getElementById('action-button');
    actionButton.click();
    fixture.detectChanges();
    flush();

    title = document.getElementById('mat-dialog-title');
    expect(title).toBe(null)

  }))

  it('verifica método calculaTotal', () => {
    const produtos: ProductData[] = [{ id: 1, name: 'fake', price: 10, quantity: 10 }]
    const total = component.calculaTotal(produtos);
    expect(total).toBe(100);
  })

  it('verifica método fetchData', fakeAsync(() => {
    component.fetchData();
    tick()
    expect(component.products.data.length).toEqual(1)
    expect(component.products.data[0].id).toEqual(1)
    expect(component.products.data[0].name).toEqual('PRODUTO FAKE')
    expect(component.products.data[0].price).toEqual(10)
    expect(component.products.data[0].quantity).toEqual(10)
    expect(component.products.data[0]).toEqual({ id: 1, name: 'PRODUTO FAKE', price: 10, quantity: 10 })
    expect(component.totalProduts).toEqual(100)
  }))

  it('verifica método addRowData chama o método fetchData', () => {
    spyOn(component, 'fetchData')
    component.addRowData({ id: 1, name: 'fake', price: 10, quantity: 10 })
    expect(component.fetchData).toHaveBeenCalled();
  })

  it('verifica exceção no método addRowData', () => {
    spyOn(component, 'fetchData')
    component.addRowData(null)
    expect(component.fetchData).not.toHaveBeenCalled();
  })

  it('verifica método updateRowData chama o método fetchData', () => {
    spyOn(component, 'fetchData')
    component.updateRowData({ id: 1, name: 'fake', price: 10, quantity: 10 })
    expect(component.fetchData).toHaveBeenCalled();
  })

  it('verifica exceção no método updateRowData', () => {
    spyOn(component, 'fetchData')
    component.updateRowData(null)
    expect(component.fetchData).not.toHaveBeenCalled();
  })

  it('verifica método deleteRowData chama o método fetchData', () => {
    spyOn(component, 'fetchData')
    component.deleteRowData({ id: 1, name: 'fake', price: 10, quantity: 10 })
    expect(component.fetchData).toHaveBeenCalled();
  })

  it('verifica exceção no método deleteRowData', () => {
    spyOn(component, 'fetchData')
    component.deleteRowData(null)
    expect(component.fetchData).not.toHaveBeenCalled();
  })

  it('verifica método isProdutoValido', () => {
    spyOn(component.productService, 'showMessage')

    let produto: ProductData = { id: 1, name: '', price: 0, quantity: 0 }
    component.isProdutoValido(produto)
    expect(component.productService.showMessage).toHaveBeenCalled();

    produto = { id: 1, name: 'fake', price: 0, quantity: 0 }
    component.isProdutoValido(produto)
    expect(component.productService.showMessage).toHaveBeenCalled();

    produto = { id: 1, name: 'fake', price: 1, quantity: 0 }
    component.isProdutoValido(produto)
    expect(component.productService.showMessage).toHaveBeenCalled();
  })

});
