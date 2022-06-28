import { IRatio } from '../types/Interfaces';
import _ from 'lodash';

export class Ratio implements IRatio {
    #dividend: number;
    #divisor: number;
    
    constructor(dividend: number, divisor: number) {
        this.#dividend = dividend;
        this.#divisor = divisor;
    }

    toNumber(fixed = 2): number {
        if (this.#divisor === 0) {
            return 0;
        }
        const num = this.#dividend / this.#divisor;
        return parseFloat(num.toFixed(fixed));
    }

    toString(seperator = '/'): string {
        return `${this.#dividend}${seperator}${this.#divisor}`;
    }

    static parseRatio(stringToParse: string, separator = '/'): Ratio | null {
        const values = stringToParse.split(separator);
        if (values.length < 2) {
            return null;
        }
        const [dividend, divisor] = _.map(values, (value) => parseInt(value));
        if (_.isNaN(dividend) || _.isNaN(divisor)) {
            return null;
        }
        return new Ratio(dividend, divisor);
    }
}
