import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;

    isAuthenticated: boolean = false;
    private userSubs!: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

    ngOnInit(): void {
        this.userSubs = this.authService.user.subscribe(
            user => {
                this.isAuthenticated = !!user;
            }
        )
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.userSubs.unsubscribe();
    }
}
