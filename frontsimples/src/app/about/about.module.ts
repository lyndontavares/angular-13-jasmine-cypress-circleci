import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AboutRoutingModule } from "./about-routing.module";
import { AboutComponent } from "./about.component";

@NgModule({
    declarations:[
        AboutComponent,
    ],
    imports:[
        CommonModule,
        AboutRoutingModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
    ]
})
export class AboutModule { }
