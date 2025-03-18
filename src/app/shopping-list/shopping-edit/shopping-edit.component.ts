import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit{

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
  }

  onAddItem(form :NgForm){
    const value = form.value;
    const name = value.name;
    const amount = value.amount;
    const ingredient = new Ingredient(name, amount);
    this.shoppingListService.onIngredientAdded(ingredient);
  }
}
