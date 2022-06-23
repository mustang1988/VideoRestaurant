import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../src/media/Media';
import mock_media from './assets/mock_media.json';

describe('MediaFormat.ts', () => {
    it('getFilename()', () => {
        const media = new Media(mock_media as unknown);
        assert.deepEqual(
            media.getFormat()?.getFilename().getValue(),
            mock_media.format.filename
        );
    });

    it('getNbStreams()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getFormat()?.getNbStreams().getValue(),
            mock_media.format.nb_streams
        );
    });

    it('getNbPrograms()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getFormat()?.getNbPrograms().getValue(),
            mock_media.format.nb_programs
        );
    });

    it('getFormatName()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getFormat()?.getFormatName().getValue(),
            mock_media.format.format_name
        );
    });

    it('getFormatLongName()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getFormat()?.getFormatLongName().getValue(),
            mock_media.format.format_long_name
        );
    });

    it('getStartTime()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getFormat()?.getStartTime().getValue(),
            mock_media.format.start_time
        );
    });

    it('getDuration()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getFormat()?.getDuration().getValue(),
            mock_media.format.duration
        );
    });

    it('getSize()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getFormat()?.getSize().getValue(),
            mock_media.format.size
        );
    });

    it('getBitRate()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getFormat()?.getBitRate().getValue(),
            mock_media.format.bit_rate
        );
    });

    it('getProbScore()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getFormat()?.getProbScore().getValue(),
            mock_media.format.probe_score
        );
    });

    it('getTags()', () => {
        const media = new Media(mock_media as unknown);
        const tags: Map<string, string> | null | undefined = media
            .getFormat()
            ?.getTags()
            .getValue();
        assert.notEqual(tags, undefined);
        assert.notEqual(tags, null);
        assert.deepEqual(
            Object.fromEntries(tags as Map<string, string>),
            mock_media.format.tags
        );
    });
});
