import { describe, it } from 'mocha';
import assert from 'assert';
import { FFmpeg } from '../../src/executable/FFmpeg';
import path from 'path';
import { existsSync, mkdirSync, readdirSync, rmdirSync, unlinkSync } from 'fs';

const TEMP_DIR = path.join(__dirname, 'test_output');

describe('FFmpeg.ts', () => {
    before(() => {
        // Create temp dir for test output, if it's not exist
        !existsSync(TEMP_DIR) && mkdirSync(TEMP_DIR);
    });
    it('constructor', () => {
        const bin = 'ffmpeg';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const output = path.join(TEMP_DIR, 'output.mp4');
        const ffmpeg = new FFmpeg(bin, input, output);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-i')?.getValue(), input);
        assert.equal(ffmpeg.getOptions().get('')?.getValue(), output);
    });

    it('hide_banner()', () => {
        const ffmpeg = new FFmpeg();
        const value = false;
        ffmpeg.hide_banner(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(
            ffmpeg.getOptions().get('-hide_banner')?.getValue(),
            value
        );
    });

    it('v()', () => {
        const ffmpeg = new FFmpeg();
        const value = '0';
        ffmpeg.v(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-v')?.getValue(), value);
    });

    it('i()', () => {
        const ffmpeg = new FFmpeg();
        const value = '0';
        ffmpeg.i(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-i')?.getValue(), value);
    });

    it('threads()', () => {
        const ffmpeg = new FFmpeg();
        const value = 10;
        ffmpeg.threads(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-threads')?.getValue(), value);
    });

    it('sn()', () => {
        const ffmpeg = new FFmpeg();
        const value = false;
        ffmpeg.sn(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-sn')?.getValue(), value);
    });

    it('dn()', () => {
        const ffmpeg = new FFmpeg();
        const value = false;
        ffmpeg.dn(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-dn')?.getValue(), value);
    });

    it('y()', () => {
        const ffmpeg = new FFmpeg();
        const value = false;
        ffmpeg.y(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-y')?.getValue(), value);
    });

    it('g()', () => {
        const ffmpeg = new FFmpeg();
        const value = 10;
        ffmpeg.g(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-g')?.getValue(), value);
    });

    it('r()', () => {
        const ffmpeg = new FFmpeg();
        const value = '24/1';
        ffmpeg.r(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-r')?.getValue(), value);
    });

    it('r(): invalid value', () => {
        const ffmpeg = new FFmpeg();
        const value = '';
        ffmpeg.r(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-r')?.getValue(), null);
    });

    it('pix_fmt()', () => {
        const ffmpeg = new FFmpeg();
        const value = 'yuv420p';
        ffmpeg.pix_fmt(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-pix_fmt')?.getValue(), value);
    });

    it('c_v()', () => {
        const ffmpeg = new FFmpeg();
        const value = 'libx264';
        ffmpeg.c_v(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-c:v')?.getValue(), value);
    });

    it('c_v(): auto set option for H.264', () => {
        const ffmpeg = new FFmpeg();
        const value = 'libx264';
        ffmpeg.c_v(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-c:v')?.getValue(), value);
        assert.equal(
            ffmpeg.getOptions().get('-preset')?.getValue(),
            'ultrafast'
        );
        assert.equal(ffmpeg.getOptions().get('-profile:v')?.getValue(), 'high');
    });

    it('c_v(): auto set option for VPx', () => {
        const ffmpeg = new FFmpeg();
        const value = 'libvpx-vp9';
        ffmpeg.c_v(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-c:v')?.getValue(), value);
        assert.equal(ffmpeg.getOptions().get('-speed')?.getValue(), 16);
        assert.equal(ffmpeg.getOptions().get('-row-mt')?.getValue(), true);
        assert.equal(
            ffmpeg.getOptions().get('-frame-parallel')?.getValue(),
            true
        );
        assert.equal(ffmpeg.getOptions().get('-tile-columns')?.getValue(), 6);
        assert.equal(
            ffmpeg.getOptions().get('-quality')?.getValue(),
            'realtime'
        );
        assert.equal(
            ffmpeg.getOptions().get('-deadline')?.getValue(),
            'realtime'
        );
        assert.equal(ffmpeg.getOptions().get('-cpu-used')?.getValue(), 1);
        assert.equal(ffmpeg.getOptions().get('-level')?.getValue(), 6.2);
    });

    it('b_v()', () => {
        const ffmpeg = new FFmpeg();
        const value = 1000;
        ffmpeg.b_v(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-b:v')?.getValue(), value);
    });

    it('preset()', () => {
        const ffmpeg = new FFmpeg();
        const value = 'faster';
        ffmpeg.c_v('libx264').preset(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-preset')?.getValue(), value);
    });

    it('preset(): without codec set as x26x', () => {
        const ffmpeg = new FFmpeg();
        const value = 'faster';
        ffmpeg.preset(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-preset')?.getValue(), undefined);
    });

    it('v_profile()', () => {
        const ffmpeg = new FFmpeg();
        const value = 'high';
        ffmpeg.c_v('libx264').v_profile(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-profile:v')?.getValue(), value);
    });

    it('v_profile(): without codec set as x26x', () => {
        const ffmpeg = new FFmpeg();
        const value = 'high';
        ffmpeg.v_profile(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(
            ffmpeg.getOptions().get('-profile:v')?.getValue(),
            undefined
        );
    });

    it('speed()', () => {
        const ffmpeg = new FFmpeg();
        const value = 4;
        ffmpeg.c_v('libvpx-vp9').speed(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-speed')?.getValue(), value);
    });

    it('speed(): without codec set as vpx', () => {
        const ffmpeg = new FFmpeg();
        const value = 4;
        ffmpeg.speed(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-speed')?.getValue(), undefined);
    });

    it('row_mt()', () => {
        const ffmpeg = new FFmpeg();
        const value = false;
        ffmpeg.c_v('libvpx-vp9').row_mt(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-row-mt')?.getValue(), value);
    });

    it('row_mt(): without codec set as vpx', () => {
        const ffmpeg = new FFmpeg();
        const value = false;
        ffmpeg.row_mt(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-row-mt')?.getValue(), undefined);
    });

    it('frame_parallel()', () => {
        const ffmpeg = new FFmpeg();
        const value = false;
        ffmpeg.c_v('libvpx-vp9').frame_parallel(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(
            ffmpeg.getOptions().get('-frame-parallel')?.getValue(),
            value
        );
    });

    it('frame_parallel(): without codec set as vpx', () => {
        const ffmpeg = new FFmpeg();
        const value = false;
        ffmpeg.frame_parallel(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(
            ffmpeg.getOptions().get('-frame-parallel')?.getValue(),
            undefined
        );
    });

    it('tile_columns()', () => {
        const ffmpeg = new FFmpeg();
        const value = 1;
        ffmpeg.c_v('libvpx-vp9').tile_columns(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(
            ffmpeg.getOptions().get('-tile-columns')?.getValue(),
            value
        );
    });

    it('tile_columns(): without codec set as vpx', () => {
        const ffmpeg = new FFmpeg();
        const value = 1;
        ffmpeg.tile_columns(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(
            ffmpeg.getOptions().get('-tile-columns')?.getValue(),
            undefined
        );
    });

    it('quality()', () => {
        const ffmpeg = new FFmpeg();
        const value = 'best';
        ffmpeg.c_v('libvpx-vp9').quality(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-quality')?.getValue(), value);
    });

    it('quality(): without codec set as vpx', () => {
        const ffmpeg = new FFmpeg();
        const value = 'best';
        ffmpeg.quality(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(
            ffmpeg.getOptions().get('-quality')?.getValue(),
            undefined
        );
    });

    it('deadline()', () => {
        const ffmpeg = new FFmpeg();
        const value = 'best';
        ffmpeg.c_v('libvpx-vp9').deadline(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-deadline')?.getValue(), value);
    });

    it('deadline(): without codec set as vpx', () => {
        const ffmpeg = new FFmpeg();
        const value = 'best';
        ffmpeg.deadline(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(
            ffmpeg.getOptions().get('-deadline')?.getValue(),
            undefined
        );
    });

    it('cpu_used()', () => {
        const ffmpeg = new FFmpeg();
        const value = 4;
        ffmpeg.c_v('libvpx-vp9').cpu_used(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-cpu-used')?.getValue(), value);
    });

    it('cpu_used(): without codec set as vpx', () => {
        const ffmpeg = new FFmpeg();
        const value = 4;
        ffmpeg.cpu_used(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(
            ffmpeg.getOptions().get('-cpu-used')?.getValue(),
            undefined
        );
    });

    it('level()', () => {
        const ffmpeg = new FFmpeg();
        const value = 4;
        ffmpeg.c_v('libvpx-vp9').level(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-level')?.getValue(), value);
    });

    it('level(): without codec set as vpx', () => {
        const ffmpeg = new FFmpeg();
        const value = 4;
        ffmpeg.level(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-level')?.getValue(), undefined);
    });

    it('c_a()', () => {
        const ffmpeg = new FFmpeg();
        const value = 'aac';
        ffmpeg.c_a(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-c:a')?.getValue(), value);
    });

    it('b_a()', () => {
        const ffmpeg = new FFmpeg();
        const value = 2048;
        ffmpeg.b_a(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-b:a')?.getValue(), value);
    });

    it('ar()', () => {
        const ffmpeg = new FFmpeg();
        const value = 44100;
        ffmpeg.ar(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-ar')?.getValue(), value);
    });

    it('safe(): true', () => {
        const ffmpeg = new FFmpeg();
        const value = true;
        ffmpeg.safe(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-safe')?.getValue(), value);
    });

    it('safe(): false', () => {
        const ffmpeg = new FFmpeg();
        const value = false;
        ffmpeg.safe(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('-safe')?.getValue(), value);
    });

    it('output()', () => {
        const ffmpeg = new FFmpeg();
        const value = path.join(TEMP_DIR, 'output.mp4');
        ffmpeg.output(value);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.getOptions().get('')?.getValue(), value);
    });

    it('getId()', () => {
        const ffmpeg = new FFmpeg();
        assert.notDeepEqual(ffmpeg, null);
        assert.notDeepEqual(ffmpeg.getId(), null);
    });

    it('getBin()', () => {
        const ffmpeg = new FFmpeg();
        assert.notDeepEqual(ffmpeg, null);
        assert.notDeepEqual(ffmpeg.getBin(), null);
    });

    it('getOptions()', () => {
        const ffmpeg = new FFmpeg();
        assert.notDeepEqual(ffmpeg, null);
        assert.notDeepEqual(ffmpeg.getOptions(), []);
    });

    it('check(): failed', () => {
        const ffmpeg = new FFmpeg();
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.check(), false);
    });

    it('check(): true', () => {
        const bin = 'ffmpeg';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const output = path.join(TEMP_DIR, 'output.mp4');
        const ffmpeg = new FFmpeg(bin, input, output);
        assert.notDeepEqual(ffmpeg, null);
        assert.equal(ffmpeg.check(), true);
    });

    it('execute()', (done) => {
        const bin = 'ffmpeg';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const output = path.join(TEMP_DIR, 'output.mp4');
        const ffmpeg = new FFmpeg(bin, input, output);
        assert.notDeepEqual(ffmpeg, null);
        ffmpeg.execute(false).then((ps) => {
            assert.notDeepEqual(ps, null);
            done();
        });
    });

    it('execute(): missing input', (done) => {
        const output = path.join(TEMP_DIR, 'output.mp4');
        const ffmpeg = new FFmpeg().output(output);
        assert.notDeepEqual(ffmpeg, null);
        ffmpeg.execute().catch((error) => {
            assert.notDeepEqual(error, null);
            done();
        });
    });

    it('execute(): missing output', (done) => {
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffmpeg = new FFmpeg().i(input);
        assert.notDeepEqual(ffmpeg, null);
        ffmpeg.execute().catch((error) => {
            assert.notDeepEqual(error, null);
            done();
        });
    });

    it('execute(): immediately', (done) => {
        const bin = 'ffmpeg';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const output = path.join(TEMP_DIR, 'output.mp4');
        const ffmpeg = new FFmpeg(bin, input, output);
        assert.notDeepEqual(ffmpeg, null);
        ffmpeg.execute().then((ps) => {
            assert.notDeepEqual(ps, null);
            done();
        });
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
