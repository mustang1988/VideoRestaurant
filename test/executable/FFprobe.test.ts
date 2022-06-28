import { describe, it } from 'mocha';
import assert from 'assert';
import { FFprobe } from '../../src/executable/FFprobe';
import path from 'path';
import _ from 'lodash';
import { MissingRequiredOptionError } from '../../src/errors/MissingRequiredOptionError';
import { FileNotFoundError } from '../../src/errors/FileNotFoundError';
import { platform } from 'os';

const runtime_platform = platform() === 'win32' ? 'windows' : platform();

describe('FFprobe.ts', () => {
    it('constructor', () => {
        const bin = path.join(
            __dirname,
            '..',
            '..',
            'bin',
            runtime_platform,
            'ffprobe.exe'
        );
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input);
        assert.deepEqual(ffprobe.getBin(), bin);
        assert.deepEqual(ffprobe.getOptions().get('-i')?.getValue(), input);
    });

    it('v()', () => {
        const log_level = '1';
        const ffprobe = new FFprobe().v(log_level);
        assert.deepEqual(ffprobe.getOptions().get('-v')?.getValue(), log_level);
    });

    it('of()', () => {
        const print_format = 'csv';
        const ffprobe = new FFprobe().of(print_format);
        assert.deepEqual(
            ffprobe.getOptions().get('-of')?.getValue(),
            print_format
        );
    });

    it('i()', () => {
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe().i(input);
        assert.deepEqual(ffprobe.getOptions().get('-i')?.getValue(), input);
    });

    it('showStreams()', () => {
        const flag = true;
        const ffprobe = new FFprobe().showStreams(flag);
        assert.deepEqual(
            ffprobe.getOptions().get('-show_streams')?.getValue(),
            flag
        );
    });

    it('showForamt()', () => {
        const flag = true;
        const ffprobe = new FFprobe().showForamt(flag);
        assert.deepEqual(
            ffprobe.getOptions().get('-show_format')?.getValue(),
            flag
        );
    });

    it('check(): failed without show anything', () => {
        const bin = path.join(
            __dirname,
            '..',
            '..',
            'bin',
            runtime_platform,
            'ffprobe.exe'
        );
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input)
            .showForamt(false)
            .showStreams(false);
        const res = ffprobe.check();
        assert.equal(res.result, false);
        assert.notEqual(res.errors, undefined);
        assert.notEqual(
            _.find(res.errors, (e) => e instanceof MissingRequiredOptionError),
            undefined
        );
    });

    it('check(): failed without input', () => {
        const ffprobe = new FFprobe();
        const res = ffprobe.check();
        assert.equal(res.result, false);
        assert.notEqual(res.errors, undefined);
        assert.notEqual(
            _.find(res.errors, (e) => e instanceof MissingRequiredOptionError),
            undefined
        );
    });

    it('check(): failed with bin not exist', () => {
        const bin = 'c:\\ffprobe';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin).i(input);
        const res = ffprobe.check();
        console.log(res);
        assert.equal(res.result, false);
        assert.notEqual(res.errors, undefined);
        assert.notEqual(
            _.find(res.errors, (e) => e instanceof FileNotFoundError),
            undefined
        );
    });

    it('check(): failed with input not exist', () => {
        const input = path.join(__dirname, 'assets', 'a.mp4');
        const ffprobe = new FFprobe().i(input);
        const res = ffprobe.check();
        console.log(res);
        assert.equal(res.result, false);
        assert.notEqual(res.errors, undefined);
        assert.notEqual(
            _.find(res.errors, (e) => e instanceof FileNotFoundError),
            undefined
        );
    });

    it('check(): true', () => {
        const bin = path.join(
            __dirname,
            '..',
            '..',
            'bin',
            runtime_platform,
            'ffprobe.exe'
        );
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input);
        const res = ffprobe.check();
        console.log(res);
        assert.equal(res.result, true);
        assert.deepEqual(res.errors, []);
    });

    it('execute()', () => {
        const bin = path.join(
            __dirname,
            '..',
            '..',
            'bin',
            runtime_platform,
            'ffprobe.exe'
        );
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input);
        assert.notDeepEqual(ffprobe.execute(), null);
    });

    it('execute(): command failed', () => {
        const bin = path.join(
            __dirname,
            '..',
            '..',
            'bin',
            runtime_platform,
            'ffprobe.exe'
        );
        const input = 'a.mp4';
        const ffprobe = new FFprobe(bin, input);
        assert.notDeepEqual(ffprobe.execute(), null);
    });

    it('execute(): missing required option', (done) => {
        const bin = path.join(
            __dirname,
            '..',
            '..',
            'bin',
            runtime_platform,
            'ffprobe.exe'
        );
        const ffprobe = new FFprobe(bin);
        ffprobe.execute().catch((error) => {
            assert.notDeepEqual(error, null);
            done();
        });
    });

    it('executeSync()', () => {
        const bin = path.join(
            __dirname,
            '..',
            '..',
            'bin',
            runtime_platform,
            'ffprobe.exe'
        );
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input);
        assert.notDeepEqual(ffprobe.executeSync(), null);
    });

    it('executeSync(): command failed', () => {
        try {
            const bin = 'ffprobe';
            const input = path.join(__dirname, 'assets', 'test.mp4');
            const ffprobe = new FFprobe(bin, input);
            assert.notDeepEqual(ffprobe.executeSync(), null);
        } catch (error) {
            assert.notEqual(error, null);
        }
    });

    it('executeSync(): missing required option', () => {
        try {
            const bin = path.join(
                __dirname,
                '..',
                '..',
                'bin',
                runtime_platform,
                'ffprobe.exe'
            );
            const ffprobe = new FFprobe(bin);
            assert.notDeepEqual(ffprobe.executeSync(), null);
        } catch (error) {
            assert.notEqual(error, null);
        }
    });
});
