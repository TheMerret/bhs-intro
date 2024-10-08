export type Listener<T = any> = (...args: T[]) => void;

export type DefaultEventMap = {
    [event: string]: Listener<any>;
};

export interface IEventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> {
    subscribe<EventKey extends keyof EventMap>(
        event: EventKey,
        listener: EventMap[EventKey]
    ): this;

    unsubscribe<EventKey extends keyof EventMap>(
        event: EventKey,
        listener: EventMap[EventKey]
    ): this;

    emit<EventKey extends keyof EventMap>(
        event: EventKey,
        ...args: Parameters<EventMap[EventKey]>
    ): void;
}

export default class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> implements IEventEmitter<EventMap> {
    private events: { [K in keyof EventMap]?: EventMap[K][] } = {};

    subscribe<EventKey extends keyof EventMap>(
        event: EventKey,
        listener: EventMap[EventKey]
    ): this {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event]!.push(listener);
        return this;
    }

    unsubscribe<EventKey extends keyof EventMap>(
        event: EventKey,
        listener: EventMap[EventKey]
    ): this {
        if (!this.events[event]) return this;
        this.events[event] = this.events[event]!.filter(l => l !== listener);
        return this;
    }

    emit<EventKey extends keyof EventMap>(
        event: EventKey,
        ...args: Parameters<EventMap[EventKey]>
    ): void {
        if (!this.events[event]) return;
        this.events[event]!.forEach(listener => listener(...args));
    }
}
