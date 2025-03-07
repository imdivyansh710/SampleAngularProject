import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent{
  
  @ViewChild('nameInput') nameInputRef: any;
  @ViewChild('amountInput') amountInputRef: any;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem(){
    let name = this.nameInputRef.nativeElement.value;
    let amount = this.amountInputRef.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.ingredientAdded.emit(ingredient);
  }
}
