import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { ProductData } from './product-data.model';

describe('Teste do service ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;
  const produtosDummy = [
    {
      id: 1,
      name: 'Produto 1',
      price: 100,
      quantity: 10
    },
    {
      id: 2,
      name: 'Produto 2',
      price: 200,
      quantity: 20
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('deve ser criado o serviço ProductService', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar um array de produtos', () => {
    let produtosApi: ProductData[];
    service.read().subscribe(result => {
      produtosApi = result;
    });
    const request = httpController.expectOne(service.baseUrl);
    request.flush(produtosDummy);
    expect(request.request.method).toBe('GET');
    expect(produtosApi).toEqual(produtosDummy);
  });

});
