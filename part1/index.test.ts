import {expect, test, vi} from 'vitest';
import EventEmitter from '.';

test('emitter emits', () => {
  const consoleMock = vi.spyOn(console, "log");

  const eventEmitter = new EventEmitter();
  function f1() {
    console.log("hello");
  }
  function f2() {
    console.log("world");
  }
  function f3() {
    console.log("some output");
  }
  eventEmitter
    .subscribe("event1", f1)
    .subscribe("event1", f2)
    .subscribe("event2", f3)
    .emit("event1");
  expect(consoleMock).toHaveBeenCalledWith("hello");
  expect(consoleMock).toHaveBeenLastCalledWith("world");
  eventEmitter.emit("event2");
  expect(consoleMock).toHaveBeenLastCalledWith("some output");
  eventEmitter.unsubscribe("event1", f1).emit("event1");
  expect(consoleMock).toHaveBeenLastCalledWith("world");
})

test("emits with args", () => {
  const consoleMock = vi.spyOn(console, "log");

  const eventEmitter = new EventEmitter<{
    event1: (a: string, b: null) => void
  }>();
  function f2(a: string, b: null) {
    console.log(`world ${a} ${b}`);
  }
  eventEmitter
    .subscribe("event1", f2)
    .emit("event1", 's', null);
  expect(consoleMock).toHaveBeenLastCalledWith("world s null");
});