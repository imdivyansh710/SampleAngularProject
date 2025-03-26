import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css'
})
export class AuthComponent {
	isLoginMode: boolean = true;
	isLoading: boolean = false;
	error: string = '';

	constructor(private authService: AuthService, private router: Router) {
	}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {

		if (!form.valid) {
			return;
		}

		const email = form.value.email;
		const password = form.value.password;

		let authObs: Observable<AuthResponse>;

		this.isLoading = true;

		if (this.isLoginMode) {
			authObs = this.authService.login(email, password)
		}
		else {
			authObs = this.authService.signUp(email, password);
		}

		authObs.subscribe(
			resData => {
				console.log(resData);
				this.isLoading = false;
				this.router.navigate(['/recipe']);
			}, errorMessage => {
				console.log(errorMessage);
				this.error = errorMessage
				this.isLoading = false;
			}
		);

		form.reset();

	}
}
