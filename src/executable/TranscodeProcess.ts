import { IFFmpeg, IProcessable } from '../types/Interfaces';
import { ChildProcess, spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import _ from 'lodash';

export class TranscodeProcess implements IProcessable {
    #ffmpeg: IFFmpeg;
    #ps: ChildProcess | null;
    #stdstr = '';
    #current = 0;
    #total = 0;

    static PROGRESS_REGEX = new RegExp('^\\s*frame='); // regex for stdout, to get how many frames has been transcoded

    constructor(ffmpeg: IFFmpeg) {
        this.#ffmpeg = ffmpeg;
        this.#ps = null;
    }

    run(): void {
        // Calcute how many frames will tanscode
        this.#total = this.#totalFrameCalcute();
        // Start transcode proces
        this.#ps = spawn(
            this.#ffmpeg.getBin(),
            this.#ffmpeg.getOptions().toArray()
        );
        this.#ps.stderr?.on('data', (data: Buffer) => {
            const str: string = data.toString();
            this.#stdstr += str;
            if (TranscodeProcess.PROGRESS_REGEX.test(str)) {
                this.#current = parseInt(
                    str
                        .substring(
                            str.indexOf('frame=') + 6,
                            str.indexOf('fps=')
                        )
                        .trim()
                );
            }
        });
        // this.#ps.on('error', (error) => {
        //     console.error('onError => ', error);
        // });
        this.#ps.on('close', (code, signal) => {
            this.#onFinishi(code, signal);
        });
    }

    getProgress(): number {
        return this.#total === 0 ? 0 : this.#current / this.#total;
    }

    getProcess(): ChildProcess | null {
        return this.#ps;
    }

    getStdout(): string {
        return this.#stdstr;
    }

    #totalFrameCalcute(): number {
        // TODO
        return 0;
    }

    #onFinishi(code: number | null, signal: NodeJS.Signals | null): void {
        // TODO
        // console.info('onClose => ', {
        //     id: this.#ffmpeg.getId(),
        //     code,
        //     signal,
        //     stdout: this.#stdstr,
        // });
        this.#writeLogFile();
    }

    #writeLogFile(): void {
        // TODO
        const output = this.#ffmpeg.getOptions().get('')?.getValue();
        const log = join(
            dirname(output as string),
            `${this.#ffmpeg.getId()}.log`
        );
        console.log(log);
        // writeFileSync(log, this.#stdstr);
    }
}
