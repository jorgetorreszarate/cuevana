import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MovieService } from '@cuevana-commons';
import { delay } from 'rxjs';
import { CardMovieSmallComponent, SkeletonComponent } from '../../commons/components';

@Component({
  selector: 'app-portal-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [RouterLink, SkeletonComponent, RouterOutlet, CardMovieSmallComponent, DatePipe]
})
export class PortalMainComponent implements OnInit {
  trending = [];
  rated = [];
  isLoadingTrend = false;
  isLoadingRated = false;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.trendingMovies();
    this.ratedMovies();
  }

  trendingMovies(): void {
    this.isLoadingTrend = true;
    this.movieService.trending()
      .pipe(
        delay(1000)
      )
      .subscribe({
        next: res => {
          this.trending = res.results.slice(0, 7);
          this.isLoadingTrend = false;
        },
        error: () => this.isLoadingTrend = false
      });
  }

  ratedMovies(): void {
    this.isLoadingRated = true;
    this.movieService.rated()
      .pipe(
        delay(1500)
      )
      .subscribe({
        next: res => {
          this.rated = res.results.slice(0, 9);
          this.isLoadingRated = false;
        },
        error: () => this.isLoadingRated = false
      });
  }

}
