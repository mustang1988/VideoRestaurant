import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../src/media/Media';
import test_metadata from './assets/mock_media.json';
import test_metadata_hdr_no_flags from './assets/mock_media_hdr_no_flags.json';
import test_metadata_hdr_color_primaries from './assets/mock_media_hdr_color_primaries.json';
import test_metadata_hdr_color_space from './assets/mock_media_hdr_color_space.json';
import test_metadata_hdr_color_transfer from './assets/mock_media_hdr_color_transfer.json';
import test_metadata_without_streams from './assets/mock_media_without_streams.json';
import test_metadata_without_format from './assets/mock_media_without_format.json';

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

    it('isHDR()', () => {
        const media = new Media(test_metadata as never);
        assert.deepEqual(media.isHDR(), true);
    });

    it('isHDR(): no video stream', () => {
        const media = new Media(test_metadata_without_streams as never);
        assert.deepEqual(media.isHDR(), false);
    });

    it('isHDR(): by color_space', () => {
        const media = new Media(test_metadata_hdr_color_space as never);
        assert.deepEqual(media.isHDR(), true);
    });

    it('isHDR(): by color_transfer', () => {
        const media = new Media(test_metadata_hdr_color_transfer as never);
        assert.deepEqual(media.isHDR(), true);
    });

    it('isHDR(): by color_primaries', () => {
        const media = new Media(test_metadata_hdr_color_primaries as never);
        assert.deepEqual(media.isHDR(), true);
    });

    it('isHDR(): no flags', () => {
        const media = new Media(test_metadata_hdr_no_flags as never);
        assert.deepEqual(media.isHDR(), false);
    });
});
