import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

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
		private recipeService: RecipeService,
		private router: Router
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
									'name': new FormControl(ingredient.Name, Validators.required),
									'amount': new FormControl(ingredient.Amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
								}
							)
						);
					}
				}
			}
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'imagePath': new FormControl(recipeImagePath, Validators.required),
			'description': new FormControl(recipeDescription, Validators.required),
			'ingredients': recipeIngredients
		});
	}

	onSubmit() {
		const formIngredients = this.recipeForm.value['ingredients'];
		
		const ingredients = formIngredients.map((ingredient: { name: string; amount: string; }) => {
			return { Name: ingredient.name, Amount: ingredient.amount };
		});
		const newRecipe = new Recipe(this.recipeForm.value['name'], this.recipeForm.value['description'], this.recipeForm.value['imagePath'], ingredients);

		if (this.editMode) {
			this.recipeService.updateRecipe(this.id, newRecipe);
		}
		else {
			this.recipeService.addRecipe(newRecipe);
		}
		this.onCancel();
	}

	get controls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}

	omAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients'))?.push(
			new FormGroup({
				'name': new FormControl(null, Validators.required),
				'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
			})
		);
	}

	onCancel() {
		 this.router.navigate(['../'], { relativeTo: this.activatedRoute });
	}
	onDeleteIngredient(index: number) {
		(<FormArray>this.recipeForm.get('ingredients'))?.removeAt(index);
	}
}