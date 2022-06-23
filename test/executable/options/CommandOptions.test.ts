import { describe, it } from 'mocha';
import assert from 'assert';
import { CommandOptions } from '../../../src/executable/options/CommandOptions';
import { StringOption } from '../../../src/executable/options/StringOption';

describe('CommandOptions.ts', () => {
    it('setOption()', () => {
        const options = new CommandOptions();
        const name = '-test';
        const value = 'test';
        options.setOption(new StringOption(name, value));
        assert.equal(options.get(name)?.getValue(), value);
    });

    it('setOption(): set unique option multi times', () => {
        const options = new CommandOptions();
        const name = '-test';
        const value_1 = 'test';
        const value_2 = 'hello';
        options.setOption(new StringOption(name, value_1, 0, [], true));
        options.setOption(new StringOption(name, value_2, 0, [], true));
        assert.equal(options.get(name)?.getValue(), value_2);
    });

    it('toArray()', () => {
        const options = new CommandOptions();
        const name_1 = 'name_1';
        const value_1 = 'value_1';
        const priority_1 = 1;
        const name_2 = 'name_2';
        const value_2 = 'value_2';
        const priority_2 = 0;
        options.setOption(new StringOption(name_1, value_1, priority_1));
        options.setOption(new StringOption(name_2, value_2, priority_2));
        assert.deepEqual(options.toArray(), [name_2, value_2, name_1, value_1]);
    });

    it('toString()', () => {
        const options = new CommandOptions();
        const name_1 = 'name_1';
        const value_1 = 'value_1';
        const priority_1 = 1;
        const name_2 = 'name_2';
        const value_2 = 'value_2';
        const priority_2 = 0;
        const name_3 = 'name_3';
        const value_3 = 'value_3';
        const priority_3 = 2;
        options.setOption(new StringOption(name_1, value_1, priority_1));
        options.setOption(
            new StringOption(name_2, value_2, priority_2, ['name_1'])
        );
        options.setOption(new StringOption(name_3, value_3, priority_3));
        assert.deepEqual(
            options.toString(),
            `${name_2} ${value_2} ${name_3} ${value_3}`
        );
    });

    it('length()', () => {
        const options = new CommandOptions();
        const name_1 = 'name_1';
        const value_1 = 'value_1';
        const priority_1 = 1;
        const name_2 = 'name_2';
        const value_2 = 'value_2';
        const priority_2 = 0;
        options.setOption(new StringOption(name_1, value_1, priority_1));
        options.setOption(new StringOption(name_2, value_2, priority_2));
        assert.deepEqual(options.length(), 2);
    });
});
