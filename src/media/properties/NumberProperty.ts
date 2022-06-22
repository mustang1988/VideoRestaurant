import _ from 'lodash';
import { IProperty } from '../../types/Interfaces';

export class NumberProperty implements IProperty<number | null> {
    #value: number | null;

    constructor(value: string | null) {
        this.#value = _.isNull(value)
            ? null
            : _.isNaN(parseFloat(value))
            ? null
            : parseFloat(value);
    }

    getValue(): number | null {
        return this.#value;
    }
}
