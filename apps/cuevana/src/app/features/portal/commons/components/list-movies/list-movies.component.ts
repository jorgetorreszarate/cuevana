import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardMovieComponent } from '../card-movie/card-movie.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss'],
  imports: [CardMovieComponent, SkeletonComponent, DecimalPipe]
})
export class ListMoviesComponent {
  readonly movies = input<any>({});
  readonly isLoading = input<boolean>(false);
  readonly changePage = output<any>();

  previousPage() {
    if (this.movies().page > 1) {
      this.goToPage(this.movies().page - 1);
    }
  }

  nextPage() {
    if (this.movies().page < this.movies().total_pages) {
      this.goToPage(this.movies().page + 1);
    }
  }

  goToPage(page: number) {
    this.movies().page = page;
    this.changePage.emit(page);
  }

}
