import { Routes } from '@angular/router';
import { InitResolver } from '@cuevana-commons';
import { PortalComponent } from './portal.component';
import { PortalDetailComponent } from './views/detail/detail.component';

export const routes: Routes = [
	{
		path: '',
		component: PortalComponent,
		resolve: { genres: InitResolver },
		children: [
			{
				path: '',
				loadChildren: () => import('./views/main/main.routes').then(m => m.routes)
			},
			{
				path: 'detalle/:id/:type',
				component: PortalDetailComponent
			},
			{
				path: 'detalle/:id/:type/:detail',
				component: PortalDetailComponent
			},
		]
	},
];
