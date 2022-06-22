import { describe, it } from 'mocha';
import assert from 'assert';
import { NumberProperty } from '../../../src/executable/properties/NumberProperty';

describe('NumberProperty.ts', () => {
    it('constructor', () => {
        const value = '10';
        const property = new NumberProperty(value);
        assert.notDeepEqual(property, null);
    });

    it('getValue()', () => {
        const value = '10';
        const property = new NumberProperty(value);
        const get_value = property.getValue();
        assert.deepEqual(get_value, parseFloat(value));
    });
});
