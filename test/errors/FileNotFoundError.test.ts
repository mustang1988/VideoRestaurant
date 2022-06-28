import { describe, it } from 'mocha';
import assert from 'assert';
import { FileNotFoundError } from '../../src/errors/FileNotFoundError';

describe('FileNotFoundError.ts', () => {
    it('constructor', () => {
        const file = 'a.mp4';
        const error = new FileNotFoundError(file);
        assert.notDeepEqual(error, null);
    });

    it('getNotFoundFile()', () => {
        const file = 'a.mp4';
        const error = new FileNotFoundError(file);
        assert.notDeepEqual(error, null);
        assert.deepEqual(error.getNotFoundFile(), file);
    });
});
