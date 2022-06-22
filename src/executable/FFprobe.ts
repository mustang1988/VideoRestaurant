import _ from 'lodash';
import { IFFprobe, IMedia, IOption } from '../types/Interfaces';
import { FlagOption } from './options/FlagOption';
import { StringOption } from './options/StringOption';
import { exec, execSync } from 'child_process';
import { Media } from '../media/Media';

export class FFprobe implements IFFprobe {
    #bin: string;
    #args: IOption<unknown>[];

    constructor(bin?: string, input?: string) {
        this.#bin = _.isNil(bin) ? 'ffprobe' : bin;
        // set "-v 0 -of json=c=1 -show_streams -show_format" by default
        this.#args = [
            new StringOption('-v', '0'),
            new StringOption('-of', 'json=c=1'),
            new FlagOption('-show_streams', true),
            new FlagOption('-show_format', true),
        ];
        !_.isNil(input) && this.#args.push(new StringOption('-i', input));
    }

    v(log_level: string): IFFprobe {
        return this.#setOption(new StringOption('-v', log_level));
    }
    of(format: string): IFFprobe {
        return this.#setOption(new StringOption('-of', format));
    }
    i(input: string): IFFprobe {
        return this.#setOption(new StringOption('-i', input));
    }
    showStreams(flag: boolean): IFFprobe {
        return this.#setOption(new FlagOption('-show_streams', flag));
    }
    showForamt(flag: boolean): IFFprobe {
        return this.#setOption(new FlagOption('-show_format', flag));
    }

    #setOption(option: IOption<unknown>): IFFprobe {
        const removed_args = _.remove(
            this.#args,
            (opt) =>
                opt.getName() === option.getName() &&
                opt.getValue() !== option.getValue()
        );
        if (removed_args.length > 0) {
            this.#args.push(option);
        }
        return this;
    }

    #getCommand(): string[] {
        const arr: string[] = [this.#bin];
        // sort args by priority
        this.#args = _.sortBy(this.#args, [
            (arg) => {
                arg.getPriority();
            },
        ]);
        this.#args.map((arg) => {
            arr.push(...arg.toArray());
        });
        return arr;
    }

    execute(): Promise<IMedia> {
        return new Promise((resolve, reject) => {
            exec(this.#getCommand().join(' '), (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                const metadata = JSON.parse(stdout);
                resolve(new Media(metadata as never));
            });
        });
    }
    executeSync(): IMedia {
        const stdout: Buffer = execSync(this.#getCommand().join(' '));
        const metadata = JSON.parse(stdout.toString('utf8'));
        return new Media(metadata as never);
    }
}
