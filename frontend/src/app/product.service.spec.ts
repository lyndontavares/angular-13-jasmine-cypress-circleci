import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { ProductData } from './product-data.model';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';

describe('Teste do service ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;
  let matSnackBar: MatSnackBar;
  let matSnackBarStub: Partial<MatSnackBar> = {
    open: (message: string, action?: string, config?: MatSnackBarConfig<any>) =>{ return null }
  };

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
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        ProductService,
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ]
    });
    matSnackBar = TestBed.inject(MatSnackBar);
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Após cada teste, certifique - se de que não há mais solicitações pendentes.
    httpController.verify();
  });

  it('deverá criar o serviço ProductService', () => {
    expect(service).toBeTruthy();
  });

  it('deverá vefificar método read retornando um array de produtos', () => {
    let produtosApi: ProductData[];
    service.read().subscribe(result => {
      produtosApi = result;
    });
    const request = httpController.expectOne(service.baseUrl); // Espera uma requisição HTTP
    request.flush(produtosDummy); // retorna um array de produtos dummy
    expect(request.request.method).toBe('GET'); // verifica se o método é GET
    expect(produtosApi).toEqual(produtosDummy); // verifica se o array retornado é o mesmo que o array dummy
  });

  it('deverá vefificar readById read retornando um produto', () => {
    let produto: ProductData;
    const id = '1'
    service.readById(id).subscribe(result => {
      produto = result;
    });
    const request = httpController.expectOne(
      {
        method: "GET",
        url: service.baseUrl + `/${id}`
      }
    );
    request.flush(produtosDummy[0]);
    expect(request.request.method).toBe('GET');
    expect(produto).toEqual(produtosDummy[0]);
  });

  /*
  //caso o subscribe retorne erro. No nosso projeto exemplo, não é possível testar isso.
  it('deve verificar exceção', () => {
    let error: any;
    service.read().subscribe({ error: (e) => error = e }); // https://rxjs.dev/deprecations/subscribe-arguments
    const request = httpController.expectOne(service.baseUrl); // Espera uma requisição HTTP
    request.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
    expect(error.indexOf("Error retrieving travellers data") >= 0).toBeTruthy();
  })
  */

  it('deverá verificar exceção no método read', () => {
    spyOn(service, "showMessage")
    service.read().subscribe(null)
    const request = httpController.expectOne(service.baseUrl);
    request.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(service.showMessage).toHaveBeenCalledTimes(1) // podemos evrtificar se o método foi chamado 1 vez
    //expect(service.showMessage).toHaveBeenCalled()     // ou seja, se o método foi simplesmente chamado
  });

  it('deverá verificar exclução de produto', () => {
    const id = '1'
    service.delete(id).subscribe()
    const request = httpController.expectOne({
      method: "DELETE",
      url: service.baseUrl+`/${id}` // verifica se a url é a mesma que a baseUrl + o id
    })
    request.flush('')
    expect(request.request.method).toBe('DELETE')
  });

  it('deverá verificar atualização de produto', () => {
    const produto = produtosDummy[0]
    service.update(produto).subscribe()
    const request = httpController.expectOne({
      method: "PUT",
      url: service.baseUrl+`/${produto.id}` // verifica se a url é a mesma que a baseUrl + o id
    })
    request.flush(produto)
    expect(request.request.method).toBe('PUT')
  })

  it('deverá verificar criação de produto', () => {
    const produto = produtosDummy[0]
    service.create(produto).subscribe()
    const request = httpController.expectOne({
      method: "POST",
      url: service.baseUrl
    })
    request.flush(produto)
    expect(request.request.method).toBe('POST')
  })

  it('deverá verificar exceção no método create', () => {
    spyOn(service, "showMessage")
    const produto = produtosDummy[0]
    service.create(produto).subscribe()
    const request = httpController.expectOne({
      method: "POST",
      url: service.baseUrl
    })
    request.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
    expect(service.showMessage).toHaveBeenCalledTimes(1)
  })

  it('deverá verificar exceção no método update', () => {
    spyOn(service, "showMessage")
    const produto = produtosDummy[0]
    service.update(produto).subscribe()
    const request = httpController.expectOne({
      method: "PUT",
      url: service.baseUrl + `/${produto.id}`
    })
    request.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
    expect(service.showMessage).toHaveBeenCalledTimes(1)
  })

  it('deverá verificar exceção no método delete', () => {
    spyOn(service, "showMessage")
    const id = '1'
    service.delete(id).subscribe()
    const request = httpController.expectOne({
      method: "DELETE",
      url: service.baseUrl + `/${id}`
    })
    request.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
    expect(service.showMessage).toHaveBeenCalledTimes(1)
  })

  it('deverá verificar exceção no método readById', () => {
    const id = '1'
    spyOn(service, "showMessage")
    service.readById(id).subscribe()
    const request = httpController.expectOne({
      method: "GET",
      url: service.baseUrl + `/${id}`
    })
    request.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
    expect(service.showMessage).toHaveBeenCalledTimes(1)
  })

  it('deverá testar o método errorHandler', () => {
    const error = {
      status: 404,
      statusText: "Network error"
    }
    spyOn(service, "showMessage")
    service.errorHandler(error)
    expect(service.showMessage).toHaveBeenCalledTimes(1)
  })

  it('deverá verificar o método showMessage com erro', () => {
    const matSnackBarSpy = spyOn(matSnackBar, 'open')
    service.showMessage("Teste 1",true)
    expect(matSnackBarSpy.calls.argsFor(0)[0]).toEqual('Teste 1');
    expect(matSnackBarSpy.calls.argsFor(0)[1]).toEqual('Erro ');
  })

  it('deverá verificar o método showMessage com info', () => {
    const matSnackBarSpy = spyOn(matSnackBar, 'open')
    service.showMessage("Teste 2", false)
    expect(matSnackBarSpy.calls.argsFor(0)[0]).toEqual('Teste 2');
    expect(matSnackBarSpy.calls.argsFor(0)[1]).toEqual('Info ');
  })

  it('deverá verificar o método showMessage default(info)', () => {
    const matSnackBarSpy = spyOn(matSnackBar, 'open')
    service.showMessage("Teste 3")
    expect(matSnackBarSpy.calls.argsFor(0)[0]).toEqual('Teste 3');
    expect(matSnackBarSpy.calls.argsFor(0)[1]).toEqual('Info ');
  })

});
