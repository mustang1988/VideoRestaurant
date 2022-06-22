import _ from 'lodash';
import { IFFmpeg, IOption, IProcessable } from '../types/Interfaces';
import { FlagOption } from './options/FlagOption';
import { RatioOption } from './options/RatioOption';
import { StringOption } from './options/StringOption';
import { Ratio } from './Ratio';

/**
 * ffmpeg
 * command template:
 * ffmpeg <common options(0.x)> \
 *  <input option(1.x)> \
 *  <video options(2.x)> \
 *  <audio options(3.x)> \
 *  <subtitle options(4.x)> \
 *  <data options(5.x)> \
 *  ...
 *  <output options(10.x)>
 */
export class FFmpeg implements IFFmpeg {
    #bin: string;
    #args: IOption<unknown>[];

    constructor(bin?: string, input?: string, output?: string) {
        this.#bin = _.isNil(bin) ? 'ffmpeg' : bin;
        // by default, -v 0 -threads 4 -sn -dn -y
        this.#args = [
            new StringOption('-v', '0', 0),
            new StringOption('-threads', '4', 1),
            new FlagOption('-sn', true),
            new FlagOption('-dn', true),
            new FlagOption('-y', true),
        ];
        !_.isNil(input) && this.#args.push(new StringOption('-i', input));
        !_.isNil(output) && this.#args.push(new StringOption('', output));
    }

    v(log_level: string): IFFmpeg {
        return this.#setOption(new StringOption('-v', log_level, 0));
    }

    i(input: string): IFFmpeg {
        return this.#setOption(new StringOption('-i', input, 1));
    }

    threads(threads: number): IFFmpeg {
        return this.#setOption(new StringOption('-threads', `${threads}`, 0.1));
    }

    sn(flag: boolean): IFFmpeg {
        return this.#setOption(new FlagOption('-sn', flag, 4));
    }

    dn(flag: boolean): IFFmpeg {
        return this.#setOption(new FlagOption('-dn', flag, 5));
    }

    y(flag: boolean): IFFmpeg {
        return this.#setOption(new FlagOption('-y', flag, 0.2));
    }

    g(gop: number): IFFmpeg {
        return this.#setOption(new StringOption('-g', `${gop}`, 2));
    }

    r(fps: string): IFFmpeg {
        return this.#setOption(
            new RatioOption('-r', Ratio.parseRatio(fps), 2.1)
        );
    }

    pix_fmt(pix_fmt: string): IFFmpeg {
        return this.#setOption(new StringOption('-pix_fmt', pix_fmt, 2.2));
    }

    c_v(codec: string): IFFmpeg {
        return this.#setOption(new StringOption('-c:v', codec, 2.3));
    }

    b_v(bit_rate: number): IFFmpeg {
        return this.#setOption(new StringOption('-b:v', `${bit_rate}`, 2.4));
    }

    preset(preset: string): IFFmpeg {
        return this.#setOption(
            new StringOption('-preset', preset, 2.5, [
                /*TODO*/
            ])
        );
    }

    v_profile(profile: string): IFFmpeg {
        return this.#setOption(
            new StringOption('-profile:v', profile, 2.6, [
                /*TODO*/
            ])
        );
    }

    speed(speed: number): IFFmpeg {
        return this.#setOption(
            new StringOption('-speed', `${speed}`, 2.5, [
                '-preset',
                'profile:v',
            ])
        );
    }

    row_mt(flag: boolean): IFFmpeg {
        return this.#setOption(
            new StringOption('-row-mt', flag ? '1' : '0', 2.6, [
                '-preset',
                'profile:v',
            ])
        );
    }

    frame_parallel(flag: boolean): IFFmpeg {
        return this.#setOption(
            new StringOption('-frame-parallel', flag ? '1' : '0', 2.7, [
                '-preset',
                'profile:v',
            ])
        );
    }

    tile_columns(tile_columns: number): IFFmpeg {
        return this.#setOption(
            new StringOption('-tile-columns', `${tile_columns}`, 2.8, [
                '-preset',
                'profile:v',
            ])
        );
    }

    quality(quality: string): IFFmpeg {
        return this.#setOption(
            new StringOption('-quality', quality, 2.9, ['-preset', 'profile:v'])
        );
    }

    deadline(deadline: string): IFFmpeg {
        return this.#setOption(
            new StringOption('-deadline', deadline, 2.9, [
                '-preset',
                'profile:v',
            ])
        );
    }

    cpu_used(cpu_used: number): IFFmpeg {
        return this.#setOption(
            new StringOption('-cpu-used', `${cpu_used}`, 2.9, [
                '-preset',
                'profile:v',
            ])
        );
    }

    level(level: number): IFFmpeg {
        return this.#setOption(
            new StringOption('-level', `${level}`, 2.9, [
                '-preset',
                'profile:v',
            ])
        );
    }

    c_a(codec: string): IFFmpeg {
        return this.#setOption(new StringOption('-c:a', codec, 3));
    }

    b_a(bit_rate: number): IFFmpeg {
        return this.#setOption(new StringOption('-b:a', `${bit_rate}`, 3.1));
    }

    ar(sample_rate: number): IFFmpeg {
        return this.#setOption(new StringOption('-ar', `${sample_rate}`, 3.2));
    }

    safe(flag: boolean): IFFmpeg {
        return this.#setOption(
            new StringOption('-safe', flag ? '1' : '0', 0.1)
        );
    }

    output(output: string): IFFmpeg {
        return this.#setOption(new StringOption('', output, 10));
    }

    execute(): Promise<IProcessable> {
        console.log('execute(): ', this.#getCommand());
        throw new Error('Method not implemented.');
    }

    executeSync(): IProcessable {
        console.log('executeSync(): ', this.#getCommand());
        throw new Error('Method not implemented.');
    }

    #setOption(option: IOption<unknown>): IFFmpeg {
        // find existed option with the same name to given option
        const option_has_been_set: IOption<unknown> | undefined = _.find(
            this.#args,
            (arg) => arg.getName() === option.getName()
        );

        if (!_.isNil(option_has_been_set)) {
            // remove exists option in arg list
            this.#args = _.remove(
                this.#args,
                (arg) => arg.getName() === option.getName()
            );
        }
        // set given option into arg list
        this.#args.push(option);
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
}
