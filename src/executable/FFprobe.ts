import _ from 'lodash';
import { ICommandOptions, IFFprobe, IMedia } from '../types/Interfaces';
import { FlagOption } from './options/FlagOption';
import { StringOption } from './options/StringOption';
import { exec, execSync } from 'child_process';
import { Media } from '../media/Media';
import { CommandOptions } from './options/CommandOptions';

/**
 * ffprobe
 * command format:
 *  <ffprobe> -v <log_level> -of <format> <-show_streams> <-show_format> -i <input file>
 */
export class FFprobe implements IFFprobe {
    #bin: string;
    #options: ICommandOptions;

    constructor(bin?: string, input?: string) {
        this.#bin = _.isNil(bin) ? 'ffprobe' : bin;
        this.#options = new CommandOptions();
        // set "-v 0 -of json=c=1 -show_streams -show_format" by default
        this.v('0').of('json=c=1').showStreams(true).showForamt(true);
        !_.isNil(input) && this.i(input);
    }

    v(log_level: string): IFFprobe {
        this.#options.setOption(new StringOption('-v', log_level, 0));
        return this;
    }

    of(format: string): IFFprobe {
        this.#options.setOption(new StringOption('-of', format, 1));
        return this;
    }

    i(input: string): IFFprobe {
        this.#options.setOption(new StringOption('-i', input, 10));
        return this;
    }

    showStreams(flag: boolean): IFFprobe {
        this.#options.setOption(new FlagOption('-show_streams', flag, 2));
        return this;
    }

    showForamt(flag: boolean): IFFprobe {
        this.#options.setOption(new FlagOption('-show_format', flag, 3));
        return this;
    }

    getBin(): string {
        return this.#bin;
    }

    getOptions(): ICommandOptions {
        return this.#options;
    }

    check(): boolean {
        const show_streams = this.#options.get('-show_streams')?.getValue();
        const show_format = this.#options.get('-show_format')?.getValue();
        const input = this.#options.get('-i')?.getValue();
        return !_.isNil(input) && (show_format as boolean || show_streams as boolean);
    }

    execute(): Promise<IMedia> {
        return new Promise((resolve, reject) => {
            !this.check() && reject(new Error('Missing required option'));
            exec(
                [this.#bin, ...this.#options.toArray()].join(' '),
                (error, stdout, stderr) => {
                    if (error) {
                        reject({ error, stderr, stdout });
                    }
                    const metadata = JSON.parse(stdout);
                    resolve(new Media(metadata as never));
                }
            );
        });
    }

    executeSync(): IMedia {
        const stdout: Buffer = execSync(
            [this.#bin, ...this.#options.toArray()].join(' ')
        );
        const metadata = JSON.parse(stdout.toString('utf8'));
        return new Media(metadata as never);
    }
}
