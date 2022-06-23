import _ from 'lodash';
import { ICommandOptions, IOption } from '../../types/Interfaces';

export class CommandOptions implements ICommandOptions {
    #options: IOption<unknown>[] = [];

    setOption(option: IOption<unknown>): void {
        const exist_option = this.getOption(option.getName());
        // remove exists option in #options
        !_.isNil(exist_option) &&
            _.remove(
                this.#options,
                (opt) => opt.getName() === option.getName()
            );
        // set given option into #options
        this.#options.push(option);
    }

    getOption(name: string): IOption<unknown> | undefined {
        return _(this.#options).find((opt) => opt.getName() === name);
    }

    getOptions(): IOption<unknown>[] {
        return this.#options;
    }

    toArray(): string[] {
        return _(
            this.#options.sort(
                (opt1, opt2) => opt1.getPriority() - opt2.getPriority()
            )
        )
            .map((opt) => opt.toArray())
            .flattenDeep()
            .value();
    }

    toString(): string {
        return this.toArray().join(' ');
    }
}
