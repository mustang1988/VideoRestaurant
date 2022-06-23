import { describe, it } from 'mocha';
import assert from 'assert';
import { StringProperty } from '../../../src/media/properties/StringProperty';

describe('StringProperty.ts', () => {
    it('constructor', () => {
        const value = '10';
        const property = new StringProperty(value);
        assert.notDeepEqual(property, null);
    });

    it('getValue()', () => {
        const value = '10';
        const property = new StringProperty(value);
        const get_value = property.getValue();
        assert.deepEqual(get_value, value);
    });
});
