import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe("Test recipe",
            "this is a sample test recipe",
            "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/09/egg-toast-recipe.jpg",
            [new Ingredient("Meat", 1),
            new Ingredient("French Fries", 20)]),
        new Recipe("Test recipe 2",
            "this is a sample test recipe 2",
            "https://www.vegrecipesofindia.com/wp-content/uploads/2009/08/upma-recipe-2-500x375.jpg",
            [new Ingredient("Buns", 2),
            new Ingredient("Meat", 1)
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}