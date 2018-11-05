const { of, from, timer } = require('rxjs');
const { scan, concatMap, delay, mapTo } = require('rxjs/operators');

const events = [
  { ts: 100000, value: 'a' },
  { ts: 100100, value: 'b' },
  { ts: 101100, value: 'c' },
  { ts: 101120, value: 'd' },
  { ts: 101150, value: 'e' },
  { ts: 101250, value: 'f' },
  { ts: 101300, value: 'g' },
  { ts: 102000, value: 'h' },
  { ts: 102010, value: 'i' },
  { ts: 103010, value: 'j' }
];

const head = (events.length > 0 && events[0]) || {};

console.time('replay');

from(events)
  .pipe(
    scan((p, event) => ({ ...event, diff: event.ts - p.ts }), head),
    concatMap(event => of(event).pipe(delay(event.diff)))
  )
  .subscribe({
    next: event => console.log(event),
    complete: () => {
      console.log('complete');
      console.timeEnd('replay');
    }
  });
