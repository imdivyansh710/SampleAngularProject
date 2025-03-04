import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe("Test recipe",
       "this is a sample test recipe", 
       "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/09/egg-toast-recipe.jpg"),
       new Recipe("Test recipe",
        "this is a sample test recipe", 
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/09/egg-toast-recipe.jpg")
  ];
}
