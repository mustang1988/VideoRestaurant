import { IProperty, IRatio } from '../../types/Interfaces';
import { Ratio } from '../../executable/Ratio';

export class RatioProperty implements IProperty<IRatio | null> {
    #value: IRatio | null;

    constructor(value: string) {
        this.#value = Ratio.parseRatio(value);
    }

    getValue(): IRatio | null {
        return this.#value;
    }
}
