import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  editMode: boolean = false;
  editedItemIndex: number = 0;
  editedItem: Ingredient = new Ingredient('', 0);
  subscription : Subscription = new Subscription();

  @ViewChild('f') slForm!: NgForm;

  constructor(private shoppingListService: ShoppingListService){}
 
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
       this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem?.Name,
          amount: this.editedItem?.Amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient( value.name, value.amount));
    }
    else {
      this.shoppingListService.onIngredientAdded( new Ingredient(value.name, value.amount));
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
