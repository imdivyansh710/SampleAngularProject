import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
	id: number = -1;
	editMode = false;
	recipeForm!: FormGroup;

	constructor(private activatedRoute: ActivatedRoute,private recipeService: RecipeService) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(
			(params: Params) => {
				this.id = +params['id'];
				this.editMode = params['id'] != null;
				this.inintForm();
			}
		);
	}

	private inintForm() {
        let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';
		
		if(this.editMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.Name;
			recipeImagePath = recipe.ImagePath;
			recipeDescription = recipe.Description;
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName),
			'imagePath': new FormControl(recipeImagePath),
			'description': new FormControl(recipeDescription)
		});
	}

	onSubmit() {
        console.log(this.recipeForm);
	}
}