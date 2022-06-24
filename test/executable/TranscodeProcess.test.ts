import { describe, it } from 'mocha';
import assert from 'assert';
import path from 'path';
import { mkdirSync, existsSync, readdirSync, unlinkSync, rmdirSync } from 'fs';
import { FFmpeg } from '../../src/executable/FFmpeg';
const TEMP_DIR = path.join(__dirname, 'test_output');

describe('TranscodeProcess.ts', () => {
    before(() => {
        // Create temp dir for test output, if it's not exist
        !existsSync(TEMP_DIR) && mkdirSync(TEMP_DIR);
    });

    it('run()', () => {
        const bin = 'ffmpeg';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const output = path.join(TEMP_DIR, 'output.mp4');
        const ffmpeg = new FFmpeg(bin, input, output)
            .c_v('libx264')
            .r('60/1')
            .preset('placebo')
            .pix_fmt('yuv420p');
        console.log(ffmpeg.getOptions().toString());
        const process = ffmpeg.execute(false);
        assert.equal(process.run(), undefined);
    });

    it('getProgress()', () => {
        const bin = 'ffmpeg';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const output = path.join(TEMP_DIR, 'output.mp4');
        const ffmpeg = new FFmpeg(bin, input, output)
            .c_v('libx264')
            .r('60/1')
            .preset('placebo')
            .pix_fmt('yuv420p');
        const process = ffmpeg.execute(false);
        assert.equal(process.getProgress(), 0);
    });

    it('getProcess()', () => {
        const bin = 'ffmpeg';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const output = path.join(TEMP_DIR, 'output.mp4');
        const ffmpeg = new FFmpeg(bin, input, output)
            .c_v('libx264')
            .r('60/1')
            .preset('placebo')
            .pix_fmt('yuv420p');
        const process = ffmpeg.execute(false);
        assert.deepEqual(process.getProcess(), null);
        process.run();
        assert.notDeepEqual(process.getProcess(), null);
    });

    it('getStdout()', () => {
        const bin = 'ffmpeg';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const output = path.join(TEMP_DIR, 'output.mp4');
        const ffmpeg = new FFmpeg(bin, input, output)
            .c_v('libx264')
            .r('24/1')
            .preset('ultrafast')
            .pix_fmt('yuv420p');
        const process = ffmpeg.execute(false);
        assert.deepEqual(process.getStdout(), '');
        process.run();
        assert.notDeepEqual(process.getStdout(), null);
    });

    after(() => {
        // Remove temp dir with all files in it
        if (existsSync(TEMP_DIR)) {
            const files = readdirSync(TEMP_DIR);
            for (const file of files) {
                unlinkSync(path.join(TEMP_DIR, file));
            }
        }
        rmdirSync(TEMP_DIR);
    });
});
