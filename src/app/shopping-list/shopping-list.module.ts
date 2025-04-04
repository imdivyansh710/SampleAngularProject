import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    { path: '', component: ShoppingListComponent },
];

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        SharedModule
    ],
    exports: [
        ShoppingEditComponent,
        ShoppingListComponent
    ],
})
export class ShoppingListModule { }