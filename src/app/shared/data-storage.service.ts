import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    
    constructor(private Http : HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.Http.put('https://angular-recipe-5faf5-default-rtdb.firebaseio.com/recipies.json', recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchRecipes() {
        this.Http.get<Recipe[]>('https://angular-recipe-5faf5-default-rtdb.firebaseio.com/recipies.json').subscribe(
            (recipes) => {
               this.recipeService.setRecipes(recipes);
            }
        )
    }
}