import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe("Test recipe",
           "this is a sample test recipe", 
           "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/09/egg-toast-recipe.jpg"),
           new Recipe("Test recipe 2",
            "this is a sample test recipe 2", 
            "https://www.vegrecipesofindia.com/wp-content/uploads/2009/08/upma-recipe-2-500x375.jpg")
      ];

      getRecipes() {
        return this.recipes.slice();
      }
}