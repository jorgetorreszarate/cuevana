import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Event, NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ClickOutDirective, MovieService, Utils } from '@cuevana-commons';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { CardMovieSmallComponent } from '../card-movie-small/card-movie-small.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, ClickOutDirective, FormsModule, ReactiveFormsModule, CardMovieSmallComponent, RouterLinkActive]
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl();

  readonly genres = signal<Array<any>>([]);
  readonly listSearch = signal<Array<any>>([]);
  readonly isLoadingSearch = signal<boolean>(false);
  readonly isShow = signal<boolean>(false);
  readonly toggleMenu = signal<boolean>(false);

  readonly movieService = inject(MovieService);
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    const genres = this.activatedRoute.snapshot.data.genres || [];
    this.genres.set(genres);

    this.searchControl.valueChanges
      .pipe(
        tap(() => {
          this.listSearch.set([]);
          this.isLoadingSearch.set(false);
          this.isShow.set(false);
        })

        // Si la longitud del carácter es mayor que 1
        , filter(value => value?.length > 1)

        , tap(() => {
          this.isShow.set(true);
          this.isLoadingSearch.set(true);
        })

        // Tiempo en milisegundos entre eventos clave
        , debounceTime(1000)

        // Si la consulta anterior es diferente de la actual 
        , distinctUntilChanged()

        // Cambiamos el observable a retornar
        , switchMap(value => {
          return this.movieService.search(value)
            .pipe(
              map(res => res.results),
              catchError(() => of([]))
            )
        })

        // subscription for response
      ).subscribe((res: any[]) => {
        this.isLoadingSearch.set(false);
        this.listSearch.set(res);
      });

    this.events();
  }

  submit() {
    this.listSearch.set([]);
    this.router.navigate(['/buscar'], { queryParams: { s: this.searchControl.value } });
    this.searchControl.reset();
  }

  toggle() {
    this.toggleMenu.update(value => !value);
    if (this.toggleMenu()) {
      document.body.classList.add('open');
    } else {
      document.body.classList.remove('open');
    }
  }

  events() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (!this.toggleMenu()) {
          return;
        }

        this.toggleMenu.set(false);
        document.body.classList.remove('open');
      }
    });
  }

}
