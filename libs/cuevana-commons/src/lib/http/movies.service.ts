import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Utils } from '@cuevana-commons';
import { environment } from 'apps/cuevana/src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService {
	private readonly apiKey = environment.themoviedbKey;
	private readonly endpoint = environment.themoviedbAPI;
	private readonly http = inject(HttpClient);

	private get<T>(url: string, params: Record<string, any> = {}): Observable<T> {
		const httpParams = new HttpParams({ fromObject: { ...params, api_key: this.apiKey, language: 'es' } });
		return this.http.get<T>(`${this.endpoint}${url}`, { params: httpParams });
	}

	private transformResults(res: any): any {
		return {
			...res,
			results: res.results?.map((item: any) => ({ ...item, path: Utils.slugify(item.title) })) || [],
		};
	}

	private fetchMovies(endpoint: string, page: number = 1): Observable<any> {
		return this.get(endpoint, { page }).pipe(map(this.transformResults));
	}

	private transformGenres(res: any): Array<any> {
		return res.genres?.map((item: any) => (
			{
				...item,
				path: Utils.slugify(item.name)
			}
		)) || [];
	}

	genres(): Observable<Array<any>> {
		return this.get('/genre/movie/list').pipe(map(this.transformGenres));
	}

	search(query: string, page: number = 1): Observable<any> {
		return this.get('/search/movie', { query, page }).pipe(map(this.transformResults));
	}

	discover(requestBody: any): Observable<any> {
		return this.get('/discover/movie', {
			...requestBody,
			sort_by: 'popularity.desc',
			include_adult: false,
			page: requestBody.page || 1,
		})
			.pipe(map(this.transformResults));
	}

	trending(): Observable<any> {
		return this.fetchMovies('/trending/all/week');
	}

	popular(page: number = 1): Observable<any> {
		return this.fetchMovies('/movie/popular', page);
	}

	rated(page: number = 1): Observable<any> {
		return this.fetchMovies('/movie/top_rated', page);
	}

	playing(page: number = 1): Observable<any> {
		return this.fetchMovies('/movie/now_playing', page);
	}

	upcoming(page: number = 1): Observable<any> {
		return this.fetchMovies('/movie/upcoming', page);
	}

	details(id: number, type: string = 'movie'): Observable<any> {
		return this.get(`/${type}/${id}`);
	}

	actors(id: number): Observable<any> {
		return this.get(`/movie/${id}/credits`);
	}
}
