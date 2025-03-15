import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

   private ingredients: Ingredient[] = [];
   ingredientChanged = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    onIngredientAdded(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
	}

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}