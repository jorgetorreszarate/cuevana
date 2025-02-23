import { DatePipe, SlicePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, RuntimePipe } from '@cuevana-commons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [SlicePipe, DatePipe, RuntimePipe]
})
export class PortalDetailComponent implements OnInit {
  readonly movie = signal<any>({});
  readonly actors = signal<Array<any>>([]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      const type: any = params.get('type');
      this.getDetail(id, type);
    });
  }

  getDetail(id: number, type: string) {
    this.movieService.details(id, type).subscribe(res => {
      this.movie.set(res);
    });

    this.movieService.actors(id).subscribe(res => {
      this.actors.set(res.cast);
    });
  }

}
