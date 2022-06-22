import { describe, it } from 'mocha';
import assert from 'assert';
import { Ratio } from '../../src/executable/Ratio';

describe('Ratio.ts', () => {
    it('constructor', () => {
        const dividend = 24;
        const divisor = 1;
        const ratio = new Ratio(dividend, divisor);
        assert.notDeepEqual(ratio, null);
    });

    it('toNumber(): with default fixed', () => {
        const dividend = 24000;
        const divisor = 1001;
        const ratio = new Ratio(dividend, divisor);
        const result: number = ratio.toNumber();
        assert.deepEqual(result, 23.98);
    });

    it('toNumber(): with specfied fixed', () => {
        const dividend = 24000;
        const divisor = 1001;
        const ratio = new Ratio(dividend, divisor);
        const result: number = ratio.toNumber(3);
        assert.deepEqual(result, 23.976);
    });

    it('toNumber(): divide zero', () => {
        const dividend = 24000;
        const divisor = 0;
        const ratio = new Ratio(dividend, divisor);
        const result: number = ratio.toNumber();
        assert.deepEqual(result, 0);
    });

    it('toString()', () => {
        const dividend = 0;
        const divisor = 0;
        const ratio = new Ratio(dividend, divisor);
        const result: string = ratio.toString();
        assert.deepEqual(result, `${dividend}/${divisor}`);
    });

    it('static parseRatio(): without default seperator', () => {
        const str = '24/1';
        const result = Ratio.parseRatio(str, '/');
        assert.notDeepEqual(result, null);
    });

    it('static parseRatio(): with default seperator', () => {
        const str = '24/1';
        const result = Ratio.parseRatio(str);
        assert.notDeepEqual(result, null);
    });

    it('static parseRatio(): unnormal at split string', () => {
        const str = '';
        const result = Ratio.parseRatio(str);
        assert.deepEqual(result, null);
    });

    it('static parseRatio(): unnormal at dividend parseInt', () => {
        const str = 'a/1';
        const result = Ratio.parseRatio(str);
        assert.deepEqual(result, null);
    });

    it('static parseRatio(): unnormal at divisor parseInt', () => {
        const str = '24/a';
        const result = Ratio.parseRatio(str);
        assert.deepEqual(result, null);
    });
});
