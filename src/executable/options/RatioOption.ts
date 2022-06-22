import _ from 'lodash';
import { IRatio } from '../../types/Interfaces';
import { Option } from './Option';

export class RatioOption extends Option<IRatio | null> {
    constructor(
        name: string,
        value: IRatio | null,
        priority = 0,
        conflicts: string[] = []
    ) {
        super(name, value, priority, conflicts);
    }
    toString(): string {
        return _.isNull(this.getValue())
            ? ''
            : `${this.getName()} ${this.getValue()?.toString()}`;
    }
}
