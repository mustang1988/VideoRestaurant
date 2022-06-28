import { describe, it } from 'mocha';
import assert from 'assert';
import { RuntimeError } from '../../src/errors/RuntimeError';

describe('RuntimeError.ts', () => {
    it('constructor()', () => {
        const bin = 'ffprobe';
        const option = [
            '-show_streams',
            '-show_format',
            'of',
            'json',
            '-i',
            'a.mp4',
        ];
        const stdout = '';
        const stderr = '';
        const error = new RuntimeError(bin, option, stdout, stderr);
        assert.notDeepEqual(error, null);
    });

    it('constructor(): with default value', () => {
        const bin = 'ffprobe';
        const option = [
            '-show_streams',
            '-show_format',
            'of',
            'json',
            '-i',
            'a.mp4',
        ];
        const error = new RuntimeError(bin, option);
        assert.notDeepEqual(error, null);
    });

    it('getBin()', () => {
        const bin = 'ffprobe';
        const option = [
            '-show_streams',
            '-show_format',
            'of',
            'json',
            '-i',
            'a.mp4',
        ];
        const stdout = '';
        const stderr = '';
        const error = new RuntimeError(bin, option, stdout, stderr);
        assert.notDeepEqual(error, null);
        assert.deepEqual(error.getBin(), bin);
    });

    it('getOptions()', () => {
        const bin = 'ffprobe';
        const option = [
            '-show_streams',
            '-show_format',
            'of',
            'json',
            '-i',
            'a.mp4',
        ];
        const stdout = '';
        const stderr = '';
        const error = new RuntimeError(bin, option, stdout, stderr);
        assert.notDeepEqual(error, null);
        assert.deepEqual(error.getOptions(), option);
    });

    it('getStdErr()', () => {
        const bin = 'ffprobe';
        const option = [
            '-show_streams',
            '-show_format',
            'of',
            'json',
            '-i',
            'a.mp4',
        ];
        const stdout = '';
        const stderr = '';
        const error = new RuntimeError(bin, option, stdout, stderr);
        assert.notDeepEqual(error, null);
        assert.deepEqual(error.getStdErr(), stderr);
    });

    it('getStdErr(): undefined stderr', () => {
        const bin = 'ffprobe';
        const option = [
            '-show_streams',
            '-show_format',
            'of',
            'json',
            '-i',
            'a.mp4',
        ];
        const error = new RuntimeError(bin, option);
        assert.notDeepEqual(error, null);
        assert.deepEqual(error.getStdErr(), '');
    });

    it('getStdOut()', () => {
        const bin = 'ffprobe';
        const option = [
            '-show_streams',
            '-show_format',
            'of',
            'json',
            '-i',
            'a.mp4',
        ];
        const stdout = '';
        const stderr = '';
        const error = new RuntimeError(bin, option, stdout, stderr);
        assert.notDeepEqual(error, null);
        assert.deepEqual(error.getStdOut(), stdout);
    });

    it('getStdOut(): undefined stdout', () => {
        const bin = 'ffprobe';
        const option = [
            '-show_streams',
            '-show_format',
            'of',
            'json',
            '-i',
            'a.mp4',
        ];
        const error = new RuntimeError(bin, option);
        assert.notDeepEqual(error, null);
        assert.deepEqual(error.getStdOut(), '');
    });
});
