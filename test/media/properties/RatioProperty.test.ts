import { describe, it } from 'mocha';
import assert from 'assert';
import { RatioProperty } from '../../../src/media/properties/RatioProperty';
import { Ratio } from '../../../src/executable/Ratio';

describe('RatioProperty.ts', () => {
    it('constructor', () => {
        const value = '24/1';
        const property = new RatioProperty(value);
        assert.notDeepEqual(property, null);
    });

    it('constructor: value is null', () => {
        const value = null;
        const property = new RatioProperty(value);
        assert.notDeepEqual(property, null);
    });

    it('getValue()', () => {
        const value = '24/1';
        const property = new RatioProperty(value);
        const get_value = property.getValue();
        assert.deepEqual(get_value, Ratio.parseRatio(value));
    });
});
