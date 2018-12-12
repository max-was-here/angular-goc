import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {

  @ViewChild('myInput') public myInput: ElementRef;

  public myObservable$: Observable<string>;
  public arrayValues: number[] = [];

  ngOnInit(): void {
    this.multiplyBy10();
    this.observeInput();
  }

  multiplyBy10() {
    // emit (1,2,3...)
    const source = from([1, 2, 3, 4, 5, 6, 7, 8]);
    // multiply each value by 10
    const example = source.pipe(
      map(x => x * 10),
      tap(x => console.log(x))
    );
    // output: 10, 20, 30...
    example.subscribe(val => this.arrayValues.push(val));
  }

  observeInput() {
    // Transform keyup events from the input into an Observable stream
    this.myObservable$ = fromEvent(this.myInput.nativeElement, 'keyup').pipe(
      map(() => this.myInput.nativeElement.value),
      tap(x => console.log(x))
    );
  }
}
