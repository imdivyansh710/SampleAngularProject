import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Ingredient[] = [];
	 private igChangedSub: Subscription = new Subscription();

	constructor(private shoppingListService: ShoppingListService) { }
	
	ngOnInit(): void {
		this.ingredients = this.shoppingListService.getIngredients();
		
		this.igChangedSub = this.shoppingListService.ingredientChanged.subscribe(
           (Ingredients : Ingredient[]) => {
			this.ingredients = Ingredients;
		   }
		);
	}

	onEditItem(index: number): void {
		this.shoppingListService.startedEditing.next(index);
	}

	ngOnDestroy(): void {
		this.igChangedSub.unsubscribe();
	}
}
