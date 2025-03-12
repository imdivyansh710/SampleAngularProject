import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = new Recipe('', '', '',[]);
  @Input() index: number = -1;

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
  }
}