import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id: number = -1;
	editMode = false;
	recipeForm!: FormGroup;

	constructor(
		private activatedRoute: ActivatedRoute,
		private recipeService: RecipeService
	) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.editMode = params['id'] != null;
			this.initForm();
		});
	}

	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';
		let recipeIngredients = new FormArray<FormGroup>([]);

		if (this.editMode) {
			const recipe = this.recipeService.getRecipe(this.id);

			if (recipe) {
				recipeName = recipe.Name || '';
				recipeImagePath = recipe.ImagePath || '';
				recipeDescription = recipe.Description || '';

				if (recipe.Ingredients && Array.isArray(recipe.Ingredients)) {
					for (let ingredient of recipe.Ingredients) {
						recipeIngredients.push(
							new FormGroup(
								{
									'name': new FormControl(ingredient.Name),
									'amount': new FormControl(ingredient.Amount)
								}
							)
						);
					}
				}
			}
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName),
			'imagePath': new FormControl(recipeImagePath),
			'description': new FormControl(recipeDescription),
			'ingredients': recipeIngredients
		});
	}

	onSubmit() {
		console.log(this.recipeForm.value);
	}

	get controls() { 
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}
}