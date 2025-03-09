import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit{

  @ViewChild('nameInput') nameInputRef: any;
  @ViewChild('amountInput') amountInputRef: any;
 
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
  }

  onAddItem(){
    let name = this.nameInputRef.nativeElement.value;
    let amount = this.amountInputRef.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.shoppingListService.onIngredientAdded(ingredient);
  }
}
