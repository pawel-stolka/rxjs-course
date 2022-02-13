import { noop } from 'rxjs';
import { createHttpObservable } from "../common/util";
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$.pipe(
      map(x => Object.values(x["payload"]))
    )

    courses$.subscribe(
      (courses) => console.log(courses),
      noop,
      () => console.log('complete')
    );
  }
}

