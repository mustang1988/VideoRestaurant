import _ from 'lodash';
import {
    CheckResult,
    ICommandOptions,
    IFFprobe,
    IMedia,
} from '../types/Interfaces';
import { FlagOption } from './options/FlagOption';
import { StringOption } from './options/StringOption';
import { exec, execSync } from 'child_process';
import { Media } from '../media/Media';
import { CommandOptions } from './options/CommandOptions';
import { Logger } from 'log4js';
import { LoggerFactory } from '../logger/factory/LoggerFactory';
import { existsSync } from 'fs';
import { MissingRequiredOptionError } from '../errors/MissingRequiredOptionError';
import { FileNotFoundError } from '../errors/FileNotFoundError';
import { RuntimeError } from '../errors/RuntimeError';

/**
 * ffprobe
 * command format:
 *  <ffprobe> -v <log_level> -of <format> <-show_streams> <-show_format> -i <input file>
 */
export class FFprobe implements IFFprobe {
    #bin: string;
    #options: ICommandOptions;
    #logger: Logger;

    static DEFAULT_BIN = 'ffprobe';

    constructor(bin?: string, input?: string) {
        this.#bin = _.isNil(bin) ? FFprobe.DEFAULT_BIN : bin;
        this.#logger = LoggerFactory.GetLogger('FFprobe');
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

    check(): CheckResult {
        const errors: Error[] = [];
        const show_streams = this.#options.get('-show_streams');
        const show_format = this.#options.get('-show_format');
        // check option -show_stream and -show_format, at least one should be set
        (!show_format?.getValue() as boolean) &&
            (!show_streams?.getValue() as boolean) &&
            errors.push(
                new MissingRequiredOptionError(`-show_streams or -show_format`)
            );
        // check option -i has been set
        const input = this.#options.get('-i');
        _.isNil(input?.getValue()) &&
            errors.push(new MissingRequiredOptionError('-i'));

        // check value of option -i, is exist
        input?.getValue() &&
            !existsSync(input.getValue() as string) &&
            errors.push(new FileNotFoundError(input?.getValue() as string));

        // check bin is exist
        const bin_exist =
            this.#bin === FFprobe.DEFAULT_BIN ? true : existsSync(this.#bin);
        !bin_exist && errors.push(new FileNotFoundError(this.#bin));

        return { result: errors.length === 0, errors };
    }

    execute(): Promise<IMedia> {
        return new Promise((resolve, reject) => {
            const check_result = this.check();
            if (check_result.result) {
                this.#logger.error('Check failed in execute(): ', {
                    options: this.#options.toArray(),
                    errors: check_result.errors,
                });
                reject(check_result.errors);
            }
            exec(
                [this.#bin, ...this.#options.toArray()].join(' '),
                (error, stdout, stderr) => {
                    if (error) {
                        const error = new RuntimeError(
                            this.#bin,
                            this.#options.toArray(),
                            stdout,
                            stderr
                        );
                        this.#logger.error('Error in execute(): ', error);
                        reject(error);
                    }
                    const metadata = JSON.parse(stdout);
                    resolve(new Media(metadata as never));
                }
            );
        });
    }

    executeSync(): IMedia {
        const check_result = this.check();
        if (!check_result.result) {
            this.#logger.error('Check failed in executeSync(): ', {
                options: this.#options.toArray(),
                errors: check_result.errors,
            });
            throw _.first(check_result.errors);
        }
        try {
            const stdout: Buffer = execSync(
                [this.#bin, ...this.#options.toArray()].join(' ')
            );
            const metadata = JSON.parse(stdout.toString('utf8'));
            return new Media(metadata as never);
        } catch (error) {
            this.#logger.error('Error in executeSync(): ', {
                bin: this.#bin,
                options: this.#options.toArray(),
                error,
            });
            throw new RuntimeError(this.#bin, this.#options.toArray());
        }
    }
}
