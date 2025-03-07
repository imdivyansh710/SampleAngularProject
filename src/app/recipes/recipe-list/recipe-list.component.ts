import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("Test recipe",
       "this is a sample test recipe", 
       "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/09/egg-toast-recipe.jpg"),
       new Recipe("Test recipe 2",
        "this is a sample test recipe 2", 
        "https://www.vegrecipesofindia.com/wp-content/uploads/2009/08/upma-recipe-2-500x375.jpg")
  ];

  onRecipeSelected(recipe : Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
