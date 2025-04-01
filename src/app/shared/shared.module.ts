import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
            LoadingSpinnerComponent,
            AlertComponent,
            DropdownDirective,
            PlaceHolderDirective
    ],
    imports: [CommonModule],
    exports: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
        PlaceHolderDirective,
        CommonModule
    ],
})
export class SharedModule { }