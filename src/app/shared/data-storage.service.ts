import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(
        private Http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.Http.put('https://angular-recipe-5faf5-default-rtdb.firebaseio.com/recipies.json', recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchRecipes() {
        // take operation is intrested in only 1 value emmited from observable after that it won't check for new value
        // exhautMap is used to return another type of observable after completing the firt observable
        return this.authService.user.pipe(take(1),
            exhaustMap(user => {
                return this.Http.get<Recipe[]>('https://angular-recipe-5faf5-default-rtdb.firebaseio.com/recipies.json',
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe, ingredients: recipe.Ingredients ? recipe.Ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }))
    }
}