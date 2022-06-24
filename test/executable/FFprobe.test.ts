import { describe, it } from 'mocha';
import assert from 'assert';
import { FFprobe } from '../../src/executable/FFprobe';
import path from 'path';

describe('FFprobe.ts', () => {
    it('constructor', () => {
        const bin = 'ffprobe';
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
        const bin = 'ffprobe';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input)
            .showForamt(false)
            .showStreams(false);
        assert.equal(ffprobe.check(), false);
    });

    it('check(): failed without input', () => {
        const ffprobe = new FFprobe();
        assert.equal(ffprobe.check(), false);
    });

    it('check(): true', () => {
        const bin = 'ffprobe';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input);
        assert.equal(ffprobe.check(), true);
    });

    it('execute()', () => {
        const bin = 'ffprobe';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input);
        assert.notDeepEqual(ffprobe.execute(), null);
    });

    it('execute(): failed', () => {
        const bin = 'ffprobe';
        const input = 'a.mp4';
        const ffprobe = new FFprobe(bin, input);
        assert.notDeepEqual(ffprobe.execute(), null);
    });

    it('execute(): missing required option', (done) => {
        const bin = 'ffprobe';
        const ffprobe = new FFprobe(bin);
        ffprobe.execute().catch((error) => {
            assert.notDeepEqual(error, null);
            done();
        });
    });

    it('executeSync()', () => {
        const bin = 'ffprobe';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input);
        assert.notDeepEqual(ffprobe.executeSync(), null);
    });

    it('executeSync(): missing required option', () => {
        try {
            const bin = 'ffprobe';
            const ffprobe = new FFprobe(bin);
            assert.notDeepEqual(ffprobe.executeSync(), null);
        } catch (error) {
            assert.notEqual(error, null);
        }
    });
});
