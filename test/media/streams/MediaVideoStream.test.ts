import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../../src/media/Media';
import mock_media from '../assets/mock_media.json';

describe('MediaVideoStream.ts', () => {
    it('getWidth()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getWidth().getValue(),
            mock_media.streams[0].width
        );
    });

    it('getHeight()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getHeight().getValue(),
            mock_media.streams[0].height
        );
    });

    it('getCodedWidth()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getCodedWidth().getValue(),
            mock_media.streams[0].coded_width
        );
    });

    it('getCodedHeight()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getCodedHeight().getValue(),
            mock_media.streams[0].coded_height
        );
    });

    it('getClosedCaptions()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getClosedCaptions()
                .getValue(),
            mock_media.streams[0].closed_captions
        );
    });

    it('getHasBFrames()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getHasBFrames().getValue(),
            mock_media.streams[0].has_b_frames
        );
    });

    it('getSampleAspectRatio()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getSampleAspectRatio()
                .getValue()
                ?.toString(':'),
            mock_media.streams[0].sample_aspect_ratio
        );
    });

    it('getDisplayAspectRatio()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getDisplayAspectRatio()
                .getValue()
                ?.toString(':'),
            mock_media.streams[0].display_aspect_ratio
        );
    });

    it('getPixFmt()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getPixFmt().getValue(),
            mock_media.streams[0].pix_fmt
        );
    });

    it('getLevel()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getLevel().getValue(),
            mock_media.streams[0].level
        );
    });

    it('getColorRange()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getColorRange().getValue(),
            mock_media.streams[0].color_range
        );
    });

    it('getColorSpace()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getColorSpace().getValue(),
            mock_media.streams[0].color_space
        );
    });

    it('getColorTransfer()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getColorTransfer().getValue(),
            mock_media.streams[0].color_transfer
        );
    });

    it('getColorPrimaries()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getColorPrimaries()
                .getValue(),
            mock_media.streams[0].color_primaries
        );
    });

    it('getChromaLocation()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getChromaLocation()
                .getValue(),
            mock_media.streams[0].chroma_location
        );
    });

    it('getRefs()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getRefs().getValue(),
            mock_media.streams[0].refs
        );
    });
});
