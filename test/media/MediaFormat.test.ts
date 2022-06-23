import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../src/media/Media';
import test_media_metadata from './assets/test_media_metadata.json';

describe('MediaFormat.ts', () => {
    it('getFilename()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.deepEqual(
            media.getFormat()?.getFilename().getValue(),
            test_media_metadata.format.filename
        );
    });

    it('getNbStreams()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getFormat()?.getNbStreams().getValue(),
            test_media_metadata.format.nb_streams
        );
    });

    it('getNbPrograms()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getFormat()?.getNbPrograms().getValue(),
            test_media_metadata.format.nb_programs
        );
    });

    it('getFormatName()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getFormat()?.getFormatName().getValue(),
            test_media_metadata.format.format_name
        );
    });

    it('getFormatLongName()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getFormat()?.getFormatLongName().getValue(),
            test_media_metadata.format.format_long_name
        );
    });

    it('getStartTime()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getFormat()?.getStartTime().getValue(),
            test_media_metadata.format.start_time
        );
    });

    it('getDuration()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getFormat()?.getDuration().getValue(),
            test_media_metadata.format.duration
        );
    });

    it('getSize()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getFormat()?.getSize().getValue(),
            test_media_metadata.format.size
        );
    });

    it('getBitRate()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getFormat()?.getBitRate().getValue(),
            test_media_metadata.format.bit_rate
        );
    });

    it('getProbScore()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getFormat()?.getProbScore().getValue(),
            test_media_metadata.format.probe_score
        );
    });

    it('getTags()', () => {
        const media = new Media(test_media_metadata as unknown);
        const tags: Map<string, string> | null | undefined = media
            .getFormat()
            ?.getTags()
            .getValue();
        assert.notEqual(tags, undefined);
        assert.notEqual(tags, null);
        assert.deepEqual(
            Object.fromEntries(tags as Map<string, string>),
            test_media_metadata.format.tags
        );
    });
});
