import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../../src/media/Media';
import test_media_metadata from '../assets/test_media_metadata.json';

describe('MediaVideoStream.ts', () => {
    it('getWidth()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getWidth().getValue(),
            test_media_metadata.streams[0].width
        );
    });

    it('getHeight()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getHeight().getValue(),
            test_media_metadata.streams[0].height
        );
    });

    it('getCodedWidth()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getCodedWidth().getValue(),
            test_media_metadata.streams[0].coded_width
        );
    });

    it('getCodedHeight()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getCodedHeight().getValue(),
            test_media_metadata.streams[0].coded_height
        );
    });

    it('getClosedCaptions()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getClosedCaptions()
                .getValue(),
            test_media_metadata.streams[0].closed_captions
        );
    });

    it('getHasBFrames()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getHasBFrames().getValue(),
            test_media_metadata.streams[0].has_b_frames
        );
    });

    it('getSampleAspectRatio()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getSampleAspectRatio()
                .getValue()
                ?.toString(':'),
            test_media_metadata.streams[0].sample_aspect_ratio
        );
    });

    it('getDisplayAspectRatio()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getDisplayAspectRatio()
                .getValue()
                ?.toString(':'),
            test_media_metadata.streams[0].display_aspect_ratio
        );
    });

    it('getPixFmt()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getPixFmt().getValue(),
            test_media_metadata.streams[0].pix_fmt
        );
    });

    it('getLevel()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getLevel().getValue(),
            test_media_metadata.streams[0].level
        );
    });

    it('getColorRange()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getColorRange().getValue(),
            test_media_metadata.streams[0].color_range
        );
    });

    it('getColorSpace()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getColorSpace().getValue(),
            test_media_metadata.streams[0].color_space
        );
    });

    it('getColorTransfer()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getColorTransfer().getValue(),
            test_media_metadata.streams[0].color_transfer
        );
    });

    it('getColorPrimaries()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getColorPrimaries()
                .getValue(),
            test_media_metadata.streams[0].color_primaries
        );
    });

    it('getChromaLocation()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getChromaLocation()
                .getValue(),
            test_media_metadata.streams[0].chroma_location
        );
    });

    it('getRefs()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getRefs().getValue(),
            test_media_metadata.streams[0].refs
        );
    });
});
