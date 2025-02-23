import { ViewportScroller } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '@cuevana-commons';
import { delay, finalize } from 'rxjs';
import { ListMoviesComponent } from '../../../../commons/components';
import { GeneralService } from '../../../../commons/services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [ListMoviesComponent]
})
export class PortalCategoryComponent implements OnInit {
  readonly id = signal<number>(0);
  readonly genre = signal<string>('');
  readonly movies = signal<any>({});
  readonly isLoading = signal<boolean>(false);

  readonly activatedRoute = inject(ActivatedRoute);
  readonly movieService = inject(MovieService);
  readonly generalService = inject(GeneralService);
  readonly scroller = inject(ViewportScroller);

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id.set(+params.get('id'));
      this.setGenre();
      this.goToPage(1);

      setTimeout(() => {
        this.scroller.scrollToAnchor('movies_container');
      }, 1);
    });
  }

  setGenre() {
    this.generalService.$genres
      .subscribe((res: { id: number; name: string; }[]) => {
        const data = res.find(item => item.id == this.id())?.name;
        this.genre.set(data);
      });
  }

  goToPage(page: number) {
    this.isLoading.set(true);
    this.movieService.discover({ with_genres: this.id(), page })
      .pipe(
        delay(2000),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: res => {
          this.movies.set(res);
        }
      });
  }

}
