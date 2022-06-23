import { describe, it } from 'mocha';
import assert from 'assert';
import { RatioOption } from '../../../src/executable/options/RatioOption';
import { Ratio } from '../../../src/executable/Ratio';

describe('RatioOption.ts', () => {
    it('constructor', () => {
        const name = '-r';
        const value = Ratio.parseRatio('30000/1001');
        const priority = 0;
        const conflicts: string[] = [];
        const option = new RatioOption(name, value, priority, conflicts);
        assert.notDeepEqual(option, null);
    });

    it('constructor: with default priority and conflicts', () => {
        const name = '-r';
        const value = Ratio.parseRatio('30000/1001');
        const option = new RatioOption(name, value);
        assert.notDeepEqual(option, null);
    });

    it('toString(): value is valid', () => {
        const name = '-r';
        const value = Ratio.parseRatio('30000/1001');
        const option = new RatioOption(name, value);
        assert.deepEqual(option.toString(), `${name} ${value?.toString()}`);
    });

    it('toString(): value is null', () => {
        const name = '-r';
        const value = null;
        const option = new RatioOption(name, value);
        assert.deepEqual(option.toString(), '');
    });

    it('getName()', () => {
        const name = '-r';
        const value = Ratio.parseRatio('30000/1001');
        const option = new RatioOption(name, value);
        assert.deepEqual(option.getName(), name);
    });

    it('getValue()', () => {
        const name = '-r';
        const value = Ratio.parseRatio('30000/1001');
        const option = new RatioOption(name, value);
        assert.deepEqual(option.getValue(), value);
    });

    it('getConflicts()', () => {
        const name = '-r';
        const value = Ratio.parseRatio('30000/1001');
        const priority = 0;
        const conflicts: string[] = ['-g'];
        const option = new RatioOption(name, value, priority, conflicts);
        assert.deepEqual(option.getConflicts(), conflicts);
    });

    it('getPriority()', () => {
        const name = '-r';
        const value = Ratio.parseRatio('30000/1001');
        const priority = 10;
        const conflicts: string[] = [];
        const option = new RatioOption(name, value, priority, conflicts);
        assert.deepEqual(option.getPriority(), priority);
    });

    it('toArray()', () => {
        const name = '-r';
        const value = Ratio.parseRatio('30000/1001');
        const priority = 10;
        const conflicts: string[] = [];
        const option = new RatioOption(name, value, priority, conflicts);
        assert.deepEqual(option.toArray(), [name, value?.toString()]);
    });

    it('toArray(): value is null', () => {
        const name = '-r';
        const value = null;
        const priority = 10;
        const conflicts: string[] = [];
        const option = new RatioOption(name, value, priority, conflicts);
        assert.deepEqual(option.toArray(), []);
    });
});
