import { describe, it } from 'mocha';
import assert from 'assert';
import { LoggerFactory } from '../../../src/logger/factory/LoggerFactory';
import { nanoid } from 'nanoid';

describe('LoggerFactory.ts', () => {
    it('getLogger()', () => {
        const module_name = nanoid();
        const logger = LoggerFactory.getLogger(module_name);
        assert.notDeepEqual(logger, null);
    });
});
