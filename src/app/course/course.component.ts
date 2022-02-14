import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const courseId = this.route.snapshot.params['id'];

    const courseUrl = `/api/courses/${courseId}`;
    const lessonsUrl = `/api/lessons?courseId=${courseId}&pageSize=100`;

    this.course$ = createHttpObservable(courseUrl);
    this.lessons$ = createHttpObservable(lessonsUrl).pipe(
      map((res) => res['payload'])
    );
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, 'keyup')
    .pipe(
      map(event => event.target.value),
      debounceTime(400),
      distinctUntilChanged() // no duplicates
    )
    .subscribe(console.log)
  }
}
