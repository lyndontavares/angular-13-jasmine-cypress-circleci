import { AboutModule } from "./about/about.module"
import { AppComponent } from "./app.component"
import { AppRoutingModule } from "./app-routing.module"
import { BaseComponent } from "./base.component"
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from "@angular/core/testing"
import { DialogBoxComponent } from "./dialog-box/dialog-box.component"
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { Location } from '@angular/common';
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
import { MatToolbarModule } from "@angular/material/toolbar"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { ProductData } from "./product-data.model"
import { ProductService } from "./product.service"
import { Router, Routes } from "@angular/router"
import { RouterTestingModule } from "@angular/router/testing"
import { of } from "rxjs"
import { routes } from './app-routing.module';

describe('Teste roteamento para AppComponent/AboutComponent', () => {


    let location: Location;
    let router: Router;
    let fixture: ComponentFixture<AppComponent>
    let component: AppComponent
    let productServiceStub : Partial<ProductService> = {
        read: () => of<ProductData[]>([
            { id: 1, name: 'fake 1', price: 1, quantity: 10 },
            { id: 1, name: 'fake 1', price: 1, quantity: 10 },
        ])
    }

    beforeEach( async() => {

        await TestBed.configureTestingModule({
            declarations:[
                AppComponent,
                BaseComponent,
                DialogBoxComponent,
            ],
            imports:[
                NoopAnimationsModule,
                AboutModule,
                AppRoutingModule,
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
                HttpClientModule,
                MatCardModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [
                Location,
                {
                    provide: ProductService, useValue: productServiceStub
                }
            ]
        }).compileComponents() // compileComponents () is asynchronous. So, we must use async ()

        fixture = await TestBed.createComponent(AppComponent)
        component = fixture.componentInstance
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture.detectChanges()
    })

    it( 'deve verificar o método openDialog',  fakeAsync(() => {

        component.openDialog('Adicionar', { id: 1, name: 'fake 1', price: 1, quantity: 10})
        fixture.detectChanges()

        let title = document.getElementById('mat-dialog-title')
        expect(title.innerText).toContain('Adicionar')

        title = document.getElementsByTagName('h1')[0]
        expect(title.innerText).withContext('com element class').toContain('Adicionar');

        let closeButton = document.getElementById('close-button');
        closeButton.click();
        fixture.detectChanges();

        //tick(); moves time forward.
        //flush(); moves time to the end.
        flush();

        title = document.getElementById('mat-dialog-title');
        expect(title).toEqual(null) //Cuidado, pois pode ser falso negativo

    }))

   it('deverá testar redirecionar para /', fakeAsync(() => {
       router.navigateByUrl('');
       tick();
       expect(location.path()).toBe('');
   }))

    it('deverá testar redirecionar para /about', fakeAsync(() => {
       router.navigateByUrl('/about');
       tick();
       fixture.detectChanges();
       expect(location.path()).toBe ('/about');
    }))

    // //https://dev.to/this-is-angular/testing-angular-routing-components-with-the-routertestingmodule-4cj0

})
