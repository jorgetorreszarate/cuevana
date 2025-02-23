import { DatePipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService, RuntimePipe } from '@cuevana-commons';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
  imports: [RouterLink, DatePipe, RuntimePipe]
})
export class CardMovieComponent implements OnInit {
  readonly movie = input<any>({});
  details: any;
  subscription: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    // console.log(this.movie());
  }

  enter() {
    this.leave();

    if (!this.details) {
      this.subscription = this.movieService.details(this.movie().id, this.movie().media_type)
        .pipe(debounceTime(1000))
        .subscribe(res => {
          this.details = res;
        });
    }
  }

  leave() {
    this.subscription?.unsubscribe();
  }

}
