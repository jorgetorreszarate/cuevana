import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '@cuevana-commons';
import { delay, finalize } from 'rxjs/operators';
import { ListMoviesComponent } from '../../../../commons/components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [ListMoviesComponent]
})
export class HomeComponent implements OnInit {
  readonly tagActive = signal<string>('popular');
  readonly popular = signal<any>({});
  readonly isLoadingPopular = signal<boolean>(false);

  readonly location = inject(Location);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly movieService = inject(MovieService);

  ngOnInit() {
    const page = +this.activatedRoute.snapshot.queryParamMap.get('page');
    this.goToPage(page || 1);
  }

  previousPage(): void {
    const { page } = this.popular();
    if (page > 1) {
      this.goToPage(page - 1);
    }
  }

  nextPage(): void {
    const { page, total_pages } = this.popular();
    if (page < total_pages) {
      this.goToPage(page + 1);
    }
  }

  goToPage(page: number): void {
    this.isLoadingPopular.set(true);

    // Ejecución dinámica de un método
    this.movieService[this.tagActive()](page)
      .pipe(
        delay(2000),
        finalize(() => this.isLoadingPopular.set(false))
      )
      .subscribe({
        next: res => {
          this.popular.set(res);
          let params = new HttpParams();
          if (page > 1) {
            params = params.set('page', page);
          }

          this.location.go('/', params.toString());
        }
      });
  }

  goToTag(tag: string): void {
    this.tagActive.set(tag);
    this.goToPage(1);
  }

}
