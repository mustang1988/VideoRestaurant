import { IProperty, IRatio } from '../../types/Interfaces';
import { Ratio } from '../../executable/Ratio';
import _ from 'lodash';

export class RatioProperty implements IProperty<IRatio | null> {
    #value: IRatio | null;

    constructor(value: string | null, seperator?: string) {
        this.#value = _.isNull(value)
            ? null
            : Ratio.parseRatio(value, seperator);
    }

    getValue(): IRatio | null {
        return this.#value;
    }
}
