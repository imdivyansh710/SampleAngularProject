import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrl: './recipes.component.css',
	providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

	constructor(private recipeService: RecipeService) { }

	ngOnInit(): void {
		
	}
}
