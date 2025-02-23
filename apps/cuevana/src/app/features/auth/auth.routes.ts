import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthSignInComponent } from './views/sign-in/sign-in.component';

export const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: 'sign-in',
				component: AuthSignInComponent
			}
		]
	}
];

