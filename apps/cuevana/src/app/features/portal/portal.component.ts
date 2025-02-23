import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from './commons/components';
import { GeneralService } from './commons/services';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class PortalComponent implements OnInit {

  readonly activatedRoute = inject(ActivatedRoute);
  readonly generalService = inject(GeneralService);

  ngOnInit() {
    const data = this.activatedRoute.snapshot.data;
    console.log("Resolver", data);
    this.generalService.$genres = data.genres;
  }

}
