import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../src/media/Media';
import test_metadata from './assets/test_media_metadata.json';
import test_metadata_without_streams from './assets/test_media_metadata_no_streams.json';
import test_metadata_without_format from './assets/test_media_metadata_no_format.json';

describe('Media.ts', () => {
    it('getStreams()', () => {
        const media = new Media(test_metadata as never);
        assert.notDeepEqual(media.getStreams(), null);
    });

    it('getStreams(): no streams given', () => {
        const media = new Media(test_metadata_without_streams as never);
        assert.deepEqual(media.getStreams(), null);
    });

    it('getFormat()', () => {
        const media = new Media(test_metadata as never);
        assert.notDeepEqual(media.getFormat(), null);
    });

    it('getFormat(): no format given', () => {
        const media = new Media(test_metadata_without_format as never);
        assert.deepEqual(media.getFormat(), null);
    });

    it('getMetadata()', () => {
        const media = new Media(test_metadata as never);
        assert.deepEqual(media.getMetadata(), test_metadata);
    });
});
