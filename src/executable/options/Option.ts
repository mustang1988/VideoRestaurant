import { IOption } from '../../types/Interfaces';

export abstract class Option<T> implements IOption<T> {
    #name: string;
    #value: T;
    #priority: number;
    #conflicts: string[];
    constructor(name: string, value: T, priority: number, conflicts: string[]) {
        this.#name = name;
        this.#value = value;
        this.#priority = priority;
        this.#conflicts = conflicts;
    }

    getName(): string {
        return this.#name;
    }

    getValue(): T {
        return this.#value;
    }

    getConflicts(): string[] {
        return this.#conflicts;
    }

    getPriority(): number {
        return this.#priority;
    }

    abstract toString(): string;

    abstract toArray(): string[];
}
