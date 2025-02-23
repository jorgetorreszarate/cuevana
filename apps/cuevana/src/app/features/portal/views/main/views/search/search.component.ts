import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '@cuevana-commons';
import { ListMoviesComponent } from '../../../../commons/components';

@Component({
  selector: 'app-portal-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [ListMoviesComponent]
})
export class PortalSearchComponent implements OnInit, OnDestroy {
  readonly keywords = signal<string>('');
  readonly movies = signal<any>({});
  carousel: HTMLElement;

  readonly activatedRoute = inject(ActivatedRoute);
  readonly movieService = inject(MovieService);

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.keywords.set(params.get('s'));
      this.goToPage(1);
    });

    // Ocultamos el carousel principal y lo mostramos nuevamente cuando se destruye el componente
    this.carousel = document.querySelector('#carousel-wrapper') as HTMLElement;
    this.carousel.style.display = 'none';
  }

  goToPage(page: number) {
    // console.log(page, this.keywords);
    this.movieService.search(this.keywords(), page)
      .subscribe(res => {
        this.movies.set(res);
      });
  }

  ngOnDestroy(): void {
    this.carousel.style.display = 'block';
  }

}
