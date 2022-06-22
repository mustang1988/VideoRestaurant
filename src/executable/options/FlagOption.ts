import { Option } from './Option';

export class FlagOption extends Option<boolean> {
    constructor(
        name: string,
        value: boolean,
        priority = 0,
        conflicts: string[] = []
    ) {
        super(name, value, priority, conflicts);
    }

    toString(): string {
        return this.getValue() ? this.getName() : '';
    }

    toArray(): string[] {
        return this.getValue() ? [this.getName()] : [];
    }
}
