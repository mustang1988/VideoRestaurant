import { describe, it } from 'mocha';
import assert from 'assert';
import { LoggerFactory } from '../../../src/logger/factory/LoggerFactory';
import { nanoid } from 'nanoid';

describe('LoggerFactory.ts', () => {
    it('getLogger()', () => {
        const module_name = nanoid();
        const logger = LoggerFactory.GetLogger(module_name);
        assert.notDeepEqual(logger, null);
        logger.info('Unit test, LoggerFactory.getLogger: ', module_name);
    });

    it('getLogger(): default', () => {
        const module_name = 'default';
        const logger = LoggerFactory.GetLogger(module_name);
        assert.notDeepEqual(logger, null);
        logger.info('Unit test, LoggerFactory.getLogger: ', module_name);
    });
});
