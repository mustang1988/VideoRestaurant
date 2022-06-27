import _ from 'lodash';
import {
    ICommandOptions,
    IFFmpeg,
    IInput,
    IProcessable,
} from '../types/Interfaces';
import { FlagOption } from './options/FlagOption';
import { RatioOption } from './options/RatioOption';
import { StringOption } from './options/StringOption';
import { Ratio } from './Ratio';
import { cpus } from 'os';
import { TranscodeProcess } from './TranscodeProcess';
import { CommandOptions } from './options/CommandOptions';
import { nanoid } from 'nanoid';
import { Logger } from 'log4js';
import { LoggerFactory } from '../logger/factory/LoggerFactory';
import { InputOption } from './options/InputOption';

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
    #id: string;
    #bin: string;
    #options: ICommandOptions;
    #logger: Logger;

    static H26X_CODECS = [
        'libx264', // H.264 CPU codec
        'h264_amf', // H.264 AMD GPU codec
        'h264_nvenc', // H.264 nVIDIA GPU codec
        'libx265', // H.265(HEVC) CPU codec
        'hevc_amf', // H.265(HEVC) AMD GPU codec
        'hevc_nvenc', // H.265(HEVC) nVIDIA GPU codec
    ];
    static VPX_CODECS = [
        'libvpx', // VP8 codec
        'libvpx-vp9', // VP9 codec
    ];

    constructor(bin?: string, input_file?: string, output?: string) {
        this.#id = nanoid();
        this.#logger = LoggerFactory.getLogger('FFmpeg');
        this.#bin = _.isNil(bin) ? 'ffmpeg' : bin;
        this.#options = new CommandOptions();
        this.hide_banner(true)
            .v('info')
            .threads(cpus().length / 2)
            .pix_fmt('yuv420p')
            .sn(true)
            .dn(true)
            .y(true);
        !_.isNil(input_file) &&
            this.#options.setOption(new InputOption(true, input_file));
        !_.isNil(output) && this.output(output);
    }

    getId(): string {
        return this.#id;
    }

    getBin(): string {
        return this.#bin;
    }

    hide_banner(flag: boolean): IFFmpeg {
        this.#options.setOption(new FlagOption('-hide_banner', flag, 0));
        return this;
    }

    v(log_level: string): IFFmpeg {
        this.#options.setOption(new StringOption('-v', log_level, 0));
        return this;
    }

    i(input: string, file = true): IFFmpeg {
        this.#options.setOption(new InputOption(file, input));
        return this;
    }

    threads(threads: number): IFFmpeg {
        this.#options.setOption(
            new StringOption('-threads', `${threads}`, 0.1)
        );
        return this;
    }

    sn(flag: boolean): IFFmpeg {
        this.#options.setOption(new FlagOption('-sn', flag, 4));
        return this;
    }

    dn(flag: boolean): IFFmpeg {
        this.#options.setOption(new FlagOption('-dn', flag, 5));
        return this;
    }

    y(flag: boolean): IFFmpeg {
        this.#options.setOption(new FlagOption('-y', flag, 9));
        return this;
    }

    g(gop: number): IFFmpeg {
        this.#options.setOption(new StringOption('-g', `${gop}`, 2));
        return this;
    }

    r(fps: string): IFFmpeg {
        this.#options.setOption(
            new RatioOption('-r', Ratio.parseRatio(fps), 2.1)
        );
        return this;
    }

    pix_fmt(pix_fmt: string): IFFmpeg {
        this.#options.setOption(new StringOption('-pix_fmt', pix_fmt, 2.2));
        return this;
    }

    c_v(codec: string): IFFmpeg {
        return this.#setVideoCodecByDefault(codec);
    }

    b_v(bit_rate: number): IFFmpeg {
        this.#options.setOption(new StringOption('-b:v', `${bit_rate}`, 2.4));
        return this;
    }

    preset(preset: string): IFFmpeg {
        FFmpeg.H26X_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-preset', preset, 2.5, [
                    '-speed',
                    '-row-mt',
                    '-frame-parallel',
                    '-tile-columns',
                    '-quality',
                    '-deadline',
                    '-cpu-used',
                    'level',
                ])
            );
        return this;
    }

    v_profile(profile: string): IFFmpeg {
        FFmpeg.H26X_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-profile:v', profile, 2.6, [
                    '-speed',
                    '-row-mt',
                    '-frame-parallel',
                    '-tile-columns',
                    '-quality',
                    '-deadline',
                    '-cpu-used',
                    'level',
                ])
            );
        return this;
    }

    speed(speed: number): IFFmpeg {
        FFmpeg.VPX_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-speed', `${speed}`, 2.5, [
                    '-preset',
                    'profile:v',
                ])
            );
        return this;
    }

    row_mt(flag: boolean): IFFmpeg {
        FFmpeg.VPX_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-row-mt', flag ? '1' : '0', 2.6, [
                    '-preset',
                    'profile:v',
                ])
            );
        return this;
    }

    frame_parallel(flag: boolean): IFFmpeg {
        FFmpeg.VPX_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-frame-parallel', flag ? '1' : '0', 2.7, [
                    '-preset',
                    'profile:v',
                ])
            );
        return this;
    }

    tile_columns(tile_columns: number): IFFmpeg {
        FFmpeg.VPX_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-tile-columns', `${tile_columns}`, 2.8, [
                    '-preset',
                    'profile:v',
                ])
            );
        return this;
    }

    quality(quality: string): IFFmpeg {
        FFmpeg.VPX_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-quality', quality, 2.9, [
                    '-preset',
                    'profile:v',
                ])
            );
        return this;
    }

    deadline(deadline: string): IFFmpeg {
        FFmpeg.VPX_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-deadline', deadline, 2.9, [
                    '-preset',
                    'profile:v',
                ])
            );
        return this;
    }

    cpu_used(cpu_used: number): IFFmpeg {
        FFmpeg.VPX_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-cpu-used', `${cpu_used}`, 2.9, [
                    '-preset',
                    'profile:v',
                ])
            );
        return this;
    }

    level(level: number): IFFmpeg {
        FFmpeg.VPX_CODECS.includes(
            this.#options.get('-c:v')?.getValue() as string
        ) &&
            this.#options.setOption(
                new StringOption('-level', `${level}`, 2.9, [
                    '-preset',
                    'profile:v',
                ])
            );
        return this;
    }

    c_a(codec: string): IFFmpeg {
        this.#options.setOption(new StringOption('-c:a', codec, 3));
        return this;
    }

    b_a(bit_rate: number): IFFmpeg {
        this.#options.setOption(new StringOption('-b:a', `${bit_rate}`, 3.1));
        return this;
    }

    ar(sample_rate: number): IFFmpeg {
        this.#options.setOption(new StringOption('-ar', `${sample_rate}`, 3.2));
        return this;
    }

    safe(flag: boolean): IFFmpeg {
        this.#options.setOption(
            new StringOption('-safe', flag ? '1' : '0', 0.1)
        );
        return this;
    }

    f(format: string, output?: boolean): IFFmpeg {
        this.#options.setOption(
            // for input format unique will be allowed, the priority will just lower than input option
            // for output format unique will not be allower, prioroty will just lower than output option
            new StringOption('-f', format, output ? 10 : 1.1, [], output)
        );
        return this;
    }

    output(output: string): IFFmpeg {
        this.#options.setOption(new StringOption('', output, 10));
        return this;
    }

    getOptions(): ICommandOptions {
        return this.#options;
    }

    getInputs(): IInput[] {
        return this.#options.getInputs();
    }

    check(): boolean {
        const input = this.#options.get('-i')?.getValue();
        const output = this.#options.get('')?.getValue();
        return !_.isNil(input) && !_.isNil(output);
    }

    execute(immediately = true): Promise<IProcessable> {
        return new Promise((resolve, reject) => {
            if (!this.check()) {
                this.#logger.error('Check failed: ', {
                    id: this.#id,
                    options: this.getOptions().toArray(),
                });
                reject(new Error('Missing required option'));
            }
            const ps = new TranscodeProcess(this);
            immediately && ps.run();
            resolve(ps);
        });
    }

    #setVideoCodecByDefault(codec: string): IFFmpeg {
        this.#options.setOption(new StringOption('-c:v', codec, 2.3));
        if (FFmpeg.H26X_CODECS.includes(codec)) {
            this.preset('ultrafast').v_profile('high');
        }
        if (FFmpeg.VPX_CODECS.includes(codec)) {
            // libvpx/libvpx-vp9
            this.speed(16)
                .row_mt(true)
                .frame_parallel(true)
                .tile_columns(6)
                .quality('realtime')
                .deadline('realtime')
                .cpu_used(1)
                .level(6.2);
        }
        return this;
    }
}
