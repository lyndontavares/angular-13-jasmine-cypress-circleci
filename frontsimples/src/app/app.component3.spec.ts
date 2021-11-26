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

describe('teste app3', () => {


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
    let mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

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
            ],
            providers: [
                //Location,
                { provide: Router, useValue: mockRouter },
                { provide: ProductService, useValue: productServiceStub }
            ]
        }).compileComponents() // compileComponents () is asynchronous. So, we must use async ()

        fixture = await TestBed.createComponent(AppComponent)
        component = fixture.componentInstance
        //router = TestBed.inject(Router);
        //location = TestBed.inject(Location);
        fixture.detectChanges()
    })

    it('deverá testar roteamento com mock route', () => {
        let aboutButton = document.getElementById('aboutButton');
        aboutButton.click()
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/about']);
    });

    https://dev.to/this-is-angular/testing-angular-routing-components-with-the-routertestingmodule-4cj0

})
