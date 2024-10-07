type Listener<T extends any[] = any[]> = (...args: T) => void;

export default class EventEmitter<Params extends Parameters<Listener>, Events extends Record<string, Params>> {
  private events: Events = {};

  // Subscribe to an event with a listener (returns this for chaining)
  subscribe<K extends keyof Events, P extends Params>(
    event: K,
    listener: Listener<P>
  ): this {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]!.push(listener);
    return this;
  }

  // Unsubscribe a listener from an event (returns this for chaining)
  unsubscribe<K extends keyof Events>(
    event: K,
    listener: Listener<Events[K]>
  ): this {
    if (!this.events[event]) return this;

    this.events[event] = this.events[event]!.filter((l) => l !== listener);
    return this;
  }

  // Trigger all listeners for a specific event (returns this for chaining)
  emit<K extends keyof Events, >(event: K, ...args: Events[K]): this {
    if (!this.events[event]) return this;

    this.events[event]!.forEach((listener) => listener(...args));
    return this;
  }
}

const emitter = new EventEmitter();

// Chainable method calls using builder pattern
emitter
  .subscribe("test", (message: number) => {
    console.log("Test event:", message);
  })
  .emit("test", "Hello, TypeScript!")
  .unsubscribe("test", (message) => {
    console.log("Test event:", message);
  });
