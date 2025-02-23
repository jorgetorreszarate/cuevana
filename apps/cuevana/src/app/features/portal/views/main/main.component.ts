import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MovieService } from '@cuevana-commons';
import { delay, finalize } from 'rxjs';
import { CardMovieSmallComponent, SkeletonComponent } from '../../commons/components';

@Component({
  selector: 'app-portal-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [RouterLink, SkeletonComponent, RouterOutlet, CardMovieSmallComponent, DatePipe]
})
export class PortalMainComponent implements OnInit {
  readonly trending = signal<Array<any>>([]);
  readonly rated = signal<Array<any>>([]);
  readonly isLoadingTrend = signal<boolean>(false);
  readonly isLoadingRated = signal<boolean>(false);

  readonly movieService = inject(MovieService);

  ngOnInit() {
    this.trendingMovies();
    this.ratedMovies();
  }

  trendingMovies(): void {
    this.isLoadingTrend.set(true);
    this.movieService.trending()
      .pipe(
        delay(1000),
        finalize(() => this.isLoadingTrend.set(false))
      )
      .subscribe({
        next: res => {
          this.trending.set(res.results.slice(0, 7));
        }
      });
  }

  ratedMovies(): void {
    this.isLoadingRated.set(true);
    this.movieService.rated()
      .pipe(
        delay(1500),
        finalize(() => this.isLoadingRated.set(false))
      )
      .subscribe({
        next: res => {
          this.rated.set(res.results.slice(0, 9));
        }
      });
  }

}
