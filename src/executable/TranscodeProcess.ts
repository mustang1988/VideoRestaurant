import { IFFmpeg, IProcessable } from '../types/Interfaces';
import { ChildProcess, spawn } from 'child_process';
import { writeFileSync } from 'fs';

export class TranscodeProcess implements IProcessable {
    #ffmpeg: IFFmpeg;
    #ps: ChildProcess;
    #log: string;
    #stdstr = '';
    #current = 0;
    #total = 0;

    constructor(ffmpeg: IFFmpeg) {
        this.#ffmpeg = ffmpeg;
        this.#log = ''; // TODO
    }

    run(): void {
        this.#ps = spawn(
            this.#ffmpeg.getBin(),
            this.#ffmpeg.getOptions().toArray()
        );
        this.#ps.stderr?.on('data', (data: Buffer) => {
            const str: string = data.toString();
            this.#stdstr += str;
            const regex = new RegExp('^\\s*frame=');
            if (regex.test(str)) {
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
        this.#ps.on('error', (error) => {
            console.error('onError => ', error);
        });
        this.#ps.on('close', (code, signal) => {
            console.info('onClose => ', {
                id: this.#ffmpeg.getId(),
                code,
                signal,
                stdout: this.#stdstr,
            });
            // write stdout into log file
            writeFileSync(this.#log, this.#stdstr);
        });
    }

    getProcess(): number {
        return this.#total === 0 ? 0 : this.#current / this.#total;
    }
}
