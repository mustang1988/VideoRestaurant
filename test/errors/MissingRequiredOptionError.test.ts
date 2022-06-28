import { describe, it } from 'mocha';
import assert from 'assert';
import { MissingRequiredOptionError } from '../../src/errors/MissingRequiredOptionError';

describe('MissingRequiredOptionError.ts', () => {
    it('constructor', () => {
        const option = '-i';
        const error = new MissingRequiredOptionError(option);
        assert.notDeepEqual(error, null);
    });

    it('getMissionOption()', () => {
        const option = '-i';
        const error = new MissingRequiredOptionError(option);
        assert.notDeepEqual(error, null);
        assert.deepEqual(error.getMissionOption(), option);
    });
});
