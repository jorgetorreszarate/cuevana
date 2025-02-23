import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-movie-small',
  templateUrl: './card-movie-small.component.html',
  styleUrls: ['./card-movie-small.component.scss'],
  imports: [RouterLink, DatePipe]
})
export class CardMovieSmallComponent {
  readonly movie = input<any>({});
}
