import { NgModule } from "@angular/core";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeRoutingModule } from "./recipe.routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
           RecipeListComponent,
           RecipeDetailComponent,
           RecipeEditComponent,
           RecipeItemComponent,
           RecipeStartComponent,
    ],
    imports: [
       RecipeRoutingModule,  
       ReactiveFormsModule,
       SharedModule
    ]
})
export class RecipeModule {

}