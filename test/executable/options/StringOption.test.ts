import { describe, it } from 'mocha';
import assert from 'assert';
import { StringOption } from '../../../src/executable/options/StringOption';

describe('StringOption.ts', () => {
    it('constructor', () => {
        const name = '-c:v';
        const value = 'libx264';
        const priority = 0;
        const conflicts: string[] = [];
        const option = new StringOption(name, value, priority, conflicts);
        assert.notDeepEqual(option, null);
    });

    it('constructor: with default priority and conflicts', () => {
        const name = '-c:v';
        const value = 'libx264';
        const option = new StringOption(name, value);
        assert.notDeepEqual(option, null);
    });

    it('toString(): value is valid', () => {
        const name = '-c:v';
        const value = 'libx264';
        const option = new StringOption(name, value);
        assert.deepEqual(option.toString(), `${name} ${value}`);
    });

    it('getName()', () => {
        const name = '-c:v';
        const value = 'libx264';
        const option = new StringOption(name, value);
        assert.deepEqual(option.getName(), name);
    });

    it('getValue()', () => {
        const name = '-c:v';
        const value = 'libx264';
        const option = new StringOption(name, value);
        assert.deepEqual(option.getValue(), value);
    });

    it('getConflicts()', () => {
        const name = '-c:v';
        const value = 'libx264';
        const priority = 0;
        const conflicts: string[] = ['-c'];
        const option = new StringOption(name, value, priority, conflicts);
        assert.deepEqual(option.getConflicts(), conflicts);
    });

    it('getPriority()', () => {
        const name = '-c:v';
        const value = 'libx264';
        const priority = 10;
        const conflicts: string[] = [];
        const option = new StringOption(name, value, priority, conflicts);
        assert.deepEqual(option.getPriority(), priority);
    });

    it('toArray()', () => {
        const name = '-c:v';
        const value = 'libx264';
        const priority = 10;
        const conflicts: string[] = [];
        const option = new StringOption(name, value, priority, conflicts);
        assert.deepEqual(option.toArray(), [name, value]);
    });
});
