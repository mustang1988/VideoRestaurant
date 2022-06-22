import _ from 'lodash';
import { IProperty } from '../../types/Interfaces';

export class NumberProperty implements IProperty<number | null> {
    #value: number | null;

    constructor(value: string) {
        const v = parseFloat(value);
        this.#value = _.isNaN(v) ? null : v;
    }

    getValue(): number | null {
        return this.#value;
    }
}
