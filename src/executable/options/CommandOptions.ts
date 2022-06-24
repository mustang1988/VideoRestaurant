import _ from 'lodash';
import { ICommandOptions, IOption } from '../../types/Interfaces';

export class CommandOptions implements ICommandOptions {
    #options: IOption<unknown>[] = [];

    setOption(option: IOption<unknown>): void {
        this.#removeExistOptions(option)
            .#removeConflictOptions(option)
            .#saveOption(option)
            .#sortOptionsByPriority();
    }

    get(name: string): IOption<unknown> | undefined {
        return _.find(this.#options, (opt) => opt.getName() === name);
    }

    toArray(): string[] {
        return _(this.#options)
            .map((opt) => opt.toArray()) // to format => [[name1, value1], [name2, value2], ...]
            .flattenDeep() // to format => [name1, value1, name2, value2, ...]
            .value();
    }

    toString(): string {
        return this.toArray().join(' ');
    }

    /**
     * Remove options which has the same name to given option, when the given option is unique
     * @param option
     */
    #removeExistOptions(option: IOption<unknown>): CommandOptions {
        option.isUnique() &&
            _.remove(
                this.#options,
                (opt) => opt.getName() === option.getName()
            );
        return this;
    }

    /**
     * Remove all options which name is in given option's conflict
     * @param option
     */
    #removeConflictOptions(option: IOption<unknown>): CommandOptions {
        !_.isEmpty(option.getConflicts()) &&
            _.remove(this.#options, (opt) =>
                option.getConflicts().includes(opt.getName())
            );
        return this;
    }

    #sortOptionsByPriority(): CommandOptions {
        this.#options.sort(
            (opt1, opt2) => opt1.getPriority() - opt2.getPriority()
        );
        return this;
    }

    #saveOption(option: IOption<unknown>): CommandOptions {
        this.#options.push(option);
        return this;
    }
}
