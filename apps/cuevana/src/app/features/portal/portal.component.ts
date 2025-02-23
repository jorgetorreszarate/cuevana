import { Component, OnInit } from '@angular/core';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    const data = this.activatedRoute.snapshot.data;
    console.log("Data extraida del resolver", data);
    this.generalService.$genres = data.genres;
  }

}
