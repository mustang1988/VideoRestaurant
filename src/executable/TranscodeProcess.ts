import { IFFmpeg, IProcessable } from '../types/Interfaces';
import { ChildProcess, spawn } from 'child_process';
import { Logger } from 'log4js';
import dotenv from 'dotenv';
import { join } from 'path';
import { LoggerFactory } from '../logger/factory/LoggerFactory';

dotenv.config({ path: join(process.cwd(), 'execute.env') });

export class TranscodeProcess implements IProcessable {
    #ffmpeg: IFFmpeg;
    #logger: Logger;

    constructor(ffmpeg: IFFmpeg) {
        this.#ffmpeg = ffmpeg;
        this.#logger = LoggerFactory.getLogger('TranscodeProcess');
    }

    run(): Promise<ChildProcess> {
        return new Promise((resolve, reject) => {
            this.#logger.info(
                'Command will execute: \n',
                [
                    this.#ffmpeg.getBin(),
                    ...this.#ffmpeg.getOptions().toArray(),
                ].join(' \\\n')
            );
            const ps = spawn(
                this.#ffmpeg.getBin(),
                this.#ffmpeg.getOptions().toArray()
            );
            ps.on(
                'close',
                (
                    code: number | undefined,
                    signal: NodeJS.Signals | undefined
                ) => {
                    this.#logger.info('spawn on close: ', { code, signal });
                    if (code !== 0) {
                        reject(new Error('Exit code is not zero'));
                    }
                    resolve(ps);
                }
            );
            // ps.on('error', (error) => {
            //     this.#logger.error('spawn on error: ', error);
            //     reject(error);
            // });
        });
    }
    // #ffmpeg: IFFmpeg;
    // #ps: ChildProcess | null;
    // #stdstr = '';
    // #current = 0;
    // #total = 0;
    // #pid = -1;

    // static PROGRESS_REGEX = new RegExp('^\\s*frame='); // regex for stdout, to get how many frames has been transcoded

    // constructor(ffmpeg: IFFmpeg) {
    //     this.#ffmpeg = ffmpeg;
    //     this.#ps = null;
    // }

    // run(): void {
    //     // Calcute how many frames will tanscode
    //     this.#total = this.#totalFrameCalculate();
    //     // Start transcode proces
    //     const ps = spawn(
    //         this.#ffmpeg.getBin(),
    //         this.#ffmpeg.getOptions().toArray()
    //     );
    //     ps.stderr?.on('data', (data: Buffer) => {
    //         const str: string = data.toString();
    //         this.#stdstr += str;
    //         if (TranscodeProcess.PROGRESS_REGEX.test(str)) {
    //             this.#current = parseInt(
    //                 str
    //                     .substring(
    //                         str.indexOf('frame=') + 6,
    //                         str.indexOf('fps=')
    //                     )
    //                     .trim()
    //             );
    //         }
    //     });
    //     // this.#ps.on('error', (error) => {
    //     //     console.error('onError => ', error);
    //     // });
    //     ps.on('close', (code, signal) => {
    //         this.#onClose(code, signal);
    //     });
    //     this.#pid = ps.pid ? ps.pid : -1;
    //     this.#ps = ps;
    // }

    // getProgress(): number {
    //     return this.#total === 0 ? 0 : this.#current / this.#total;
    // }

    // getProcess(): ChildProcess | null {
    //     return this.#ps;
    // }

    // getStdout(): string {
    //     return this.#stdstr;
    // }

    // #totalFrameCalculate(): number {
    //     let frame_count = 0;
    //     const input = this.#ffmpeg.getOptions().get('-i')?.getValue();
    //     const media = new FFprobe().i(input as string).executeSync();
    //     const target_frame_rate = this.#ffmpeg
    //         .getOptions()
    //         .get('-r')
    //         ?.getValue();
    //     const duration = media
    //         .getStreams()
    //         ?.getVideoStream()
    //         ?.getDuration()
    //         .getValue();
    //     // transcode with specified fps
    //     if (!_.isNil(target_frame_rate) && !_.isNil(duration)) {
    //         frame_count = Math.ceil(
    //             (target_frame_rate as IRatio).toNumber() * duration
    //         );
    //     } else {
    //         // transcode without specified fps
    //         const nb_frames = media
    //             .getStreams()
    //             ?.getVideoStream()
    //             ?.getNbFrames()
    //             .getValue();
    //         frame_count = _.isNil(nb_frames)
    //             ? 0 // unknown frame count
    //             : nb_frames; // for transcode with origin fps
    //     }
    //     console.log(
    //         'TranscodeProcess.#totalFrameCalculate() return: ',
    //         frame_count
    //     );
    //     return frame_count;
    // }

    // #onClose(code: number | null, signal: NodeJS.Signals | null): void {
    //     // TODO
    //     console.info('onClose => ', {
    //         id: this.#ffmpeg.getId(),
    //         code,
    //         signal,
    //         stdout: this.#stdstr,
    //     });
    //     this.#writeLogFile();
    //     // Call Chef
    // }

    // #writeLogFile(): void {
    //     // TODO
    //     const output = this.#ffmpeg.getOptions().get('')?.getValue();
    //     const log = join(
    //         dirname(output as string),
    //         `${this.#ffmpeg.getId()}.log`
    //     );
    //     console.log(log);
    //     // writeFileSync(log, this.#stdstr);
    // }
}
