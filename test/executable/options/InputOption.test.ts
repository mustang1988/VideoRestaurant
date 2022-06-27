import { describe, it } from 'mocha';
import assert from 'assert';
import { InputOption } from '../../../src/executable/options/InputOption';

describe('InputOption.ts', () => {
    it('isFile()', () => {
        const is_file = true;
        const input = 'a.mp4';
        const opt = new InputOption(is_file, input);
        assert.equal(opt.isFile(), is_file);
    });

    it('isFile(): false', () => {
        const is_file = false;
        const input = 'anullsrc=channel_layout=stereo:sample_rate=44100';
        const opt = new InputOption(is_file, input);
        assert.equal(opt.isFile(), is_file);
    });
});
