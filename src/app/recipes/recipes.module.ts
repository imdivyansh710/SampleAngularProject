import { NgModule } from "@angular/core";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeRoutingModule } from "./recipe.routing.module";
import { RouterModule } from "@angular/router";

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
       CommonModule, 
       ReactiveFormsModule
    ],
    exports: [
        RecipesComponent,
           RecipeListComponent,
           RecipeDetailComponent,
           RecipeEditComponent,
           RecipeItemComponent,
           RecipeStartComponent,
    ]
})
export class RecipeModule {

}