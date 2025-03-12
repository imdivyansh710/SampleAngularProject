import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'app-recipe-detail',
   templateUrl: './recipe-detail.component.html',
   styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
   recipe: Recipe = new Recipe('', '', '', []);
   id: number = -1;

   constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) { }
   ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
         this.id = +params['id'];
         this.recipe = this.recipeService.getRecipe(this.id);
      });
   }

   onAddToShoppingList() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.Ingredients);
   }

   onEditRecipe() {
      this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
   }
}