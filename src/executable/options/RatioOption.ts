import _ from 'lodash';
import { IRatio } from '../../types/Interfaces';
import { Option } from './Option';

export class RatioOption extends Option<IRatio | null> {
    constructor(
        name: string,
        value: IRatio | null,
        priority = 0,
        conflicts: string[] = [],
        unique = true
    ) {
        super(name, value, priority, conflicts, unique);
    }

    toString(): string {
        return _.isNull(this.getValue())
            ? ''
            : `${this.getName()} ${this.getValue()?.toString()}`;
    }

    toArray(): string[] {
        const arr: string[] = [];
        const value = this.getValue();
        !_.isNull(value) && arr.push(...[this.getName(), value.toString()]);
        return arr;
    }
}
