import { describe, it } from 'mocha';
import assert from 'assert';
import path from 'path';
import { mkdirSync, existsSync, readdirSync, unlinkSync, rmdirSync } from 'fs';
const TEMP_DIR = path.join(__dirname, 'test_output');

describe('TranscodeProcess.ts', () => {
    before(() => {
        // Create temp dir for test output, if it's not exist
        !existsSync(TEMP_DIR) && mkdirSync(TEMP_DIR);
    });
    it.skip('run()', () => {});
    it.skip('getProgress()', () => {});
    it.skip('getProcess()', () => {});
    it.skip('getStdout()', () => {});
    after(() => {
        // Remove temp dir with all files in it
        if (existsSync(TEMP_DIR)) {
            const files = readdirSync(TEMP_DIR);
            for (const file of files) {
                unlinkSync(path.join(TEMP_DIR, file));
            }
        }
        rmdirSync(TEMP_DIR);
    });
});
