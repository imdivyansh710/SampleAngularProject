import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "./shared/shared.module";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipe', pathMatch: 'full' },
    { path: 'recipe', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipeModule) },
    ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes),
        SharedModule
    ],
    exports: [RouterModule]
})
export class AppRouting {
}