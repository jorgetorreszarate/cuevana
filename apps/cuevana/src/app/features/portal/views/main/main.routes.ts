import { Routes } from "@angular/router";
import { AuthenticatedGuard } from "@cuevana-commons";
import { PortalMainComponent } from "./main.component";
import { PortalAdultsComponent } from "./views/adults/adults.component";
import { PortalCategoryComponent } from "./views/category/category.component";
import { HomeComponent } from "./views/home/home.component";
import { PortalSearchComponent } from "./views/search/search.component";

export const routes: Routes = [
  {
    path: '',
    component: PortalMainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'categoria/:id',
        component: PortalCategoryComponent
      },
      {
        path: 'buscar',
        component: PortalSearchComponent
      },
      {
        path: 'adultos',
        canActivate: [AuthenticatedGuard],
        component: PortalAdultsComponent
      },
    ]
  }
];
