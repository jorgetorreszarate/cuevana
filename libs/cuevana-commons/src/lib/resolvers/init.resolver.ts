import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MovieService } from '../http/movies.service';

export const InitResolver: ResolveFn<any> = () => {
    const movieService = inject(MovieService);

    return movieService.genres();
}
