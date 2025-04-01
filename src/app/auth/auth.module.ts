import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    ];

@NgModule({
    declarations: [
        AuthComponent,
    ],
       
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports: [
        AuthComponent
    ],
})
export class AuthModule { }