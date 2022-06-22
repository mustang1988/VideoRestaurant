import { describe, it } from 'mocha';
import assert from 'assert';
import { FlagOption } from '../../../src/executable/options/FlagOption';

describe('FlagOption.ts', () => {
    it('constructor', () => {
        const name = '-show_streams';
        const value = true;
        const priority = 0;
        const conflicts: string[] = [];
        const option = new FlagOption(name, value, priority, conflicts);
        assert.notDeepEqual(option, null);
    });

    it('constructor: with default priority and conflicts', () => {
        const name = '-show_streams';
        const value = true;
        const option = new FlagOption(name, value);
        assert.notDeepEqual(option, null);
    });

    it('toString(): value is true', () => {
        const name = '-show_streams';
        const value = true;
        const option = new FlagOption(name, value);
        assert.deepEqual(option.toString(), `${name}`);
    });

    it('toString(): value is false', () => {
        const name = '-show_streams';
        const value = false;
        const option = new FlagOption(name, value);
        assert.deepEqual(option.toString(), '');
    });

    it('getName()', () => {
        const name = '-show_streams';
        const value = false;
        const option = new FlagOption(name, value);
        assert.deepEqual(option.getName(), name);
    });

    it('getValue()', () => {
        const name = '-show_streams';
        const value = false;
        const option = new FlagOption(name, value);
        assert.deepEqual(option.getValue(), value);
    });

    it('getConflicts()', () => {
        const name = '-show_streams';
        const value = false;
        const priority = 0;
        const conflicts: string[] = ['-show_entries'];
        const option = new FlagOption(name, value, priority, conflicts);
        assert.deepEqual(option.getConflicts(), conflicts);
    });

    it('getPriority()', () => {
        const name = '-show_streams';
        const value = false;
        const priority = 10;
        const conflicts: string[] = [];
        const option = new FlagOption(name, value, priority, conflicts);
        assert.deepEqual(option.getPriority(), priority);
    });
});
