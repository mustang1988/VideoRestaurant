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

    it('execute()', () => {
        const bin = 'ffprobe';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input);
        assert.notDeepEqual(ffprobe.execute(), null);
    });

    it('execute(): failed', () => {
        const bin = 'ffprobe';
        const input = path.join(__dirname, 'assets', 'a.mp4');
        const ffprobe = new FFprobe(bin, input);
        assert.notDeepEqual(ffprobe.execute(), null);
    });

    it('executeSync()', () => {
        const bin = 'ffprobe';
        const input = path.join(__dirname, 'assets', 'test.mp4');
        const ffprobe = new FFprobe(bin, input);
        assert.notDeepEqual(ffprobe.executeSync(), null);
    });
});
