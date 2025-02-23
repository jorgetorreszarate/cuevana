import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let request = req;

  const token = null; //'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzAxNjdkZTQxMGQ4NzU5MDdkNmE0MGRmNGI0NWNiMiIsInN1YiI6IjVlYTFkODk5OGU4NzAyMDAxZjEwMjRkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xPpVi7LTGd3_sokD4iN4naVA3W9NpL8EVPgNxKaA5AQ';
  if (token) {
    request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(request);

  // Simulamos una demora de 2 segundos en todos los servicios
  /* return timer(2000).pipe(
    switchMap(() => next.handle(request))
  ); */
}
