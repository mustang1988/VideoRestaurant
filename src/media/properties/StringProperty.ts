import { IProperty } from '../../types/Interfaces';

export class StringProperty implements IProperty<string | null> {
    #value: string | null;

    constructor(value: string) {
        this.#value = value;
    }

    getValue(): string | null {
        return this.#value;
    }
}
