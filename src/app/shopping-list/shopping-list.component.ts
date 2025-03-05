import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
 ingredients: Ingredient[] = [
  new Ingredient("Apples",50),
  new Ingredient("Tomatoes",40)
 ];
}
