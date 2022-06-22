import _ from 'lodash';
import { Option } from './Option';

export class StringOption extends Option<string> {
    constructor(
        name: string,
        value: string,
        priority = 0,
        conflicts: string[] = []
    ) {
        super(name, value, priority, conflicts);
    }

    toString(): string {
        return `${this.getName()} ${this.getValue()}`;
    }

    toArray(): string[] {
        const arr: string[] = [];
        !_.isEmpty(this.getName()) && arr.push(this.getName());
        arr.push(this.getValue());
        return arr;
    }
}
