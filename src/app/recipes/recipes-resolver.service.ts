import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Recipe[]> | Observable<Recipe[]> | Recipe[] {

        const recipes = this.recipeService.getRecipes();

        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        }
        return recipes;
    }
}