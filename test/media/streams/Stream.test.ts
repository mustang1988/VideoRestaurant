import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../../src/media/Media';
import test_media_metadata from '../assets/test_media_metadata.json';

describe('Stream.ts', () => {
    it('getIndex()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getIndex().getValue(),
            test_media_metadata.streams[0].index
        );
    });

    it('getCodecName()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getCodecName().getValue(),
            test_media_metadata.streams[0].codec_name
        );
    });

    it('getCodecLongName()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getCodecLongName().getValue(),
            test_media_metadata.streams[0].codec_long_name
        );
    });

    it('getProfile()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getProfile().getValue(),
            test_media_metadata.streams[0].profile
        );
    });

    it('getCodecTagString()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getCodecTagString()
                .getValue(),
            test_media_metadata.streams[0].codec_tag_string
        );
    });

    it('getCodecTag()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getCodecTag().getValue(),
            test_media_metadata.streams[0].codec_tag
        );
    });

    it('getRFrameRate()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getRFrameRate()
                .getValue()
                ?.toString(),
            test_media_metadata.streams[0].r_frame_rate
        );
    });

    it('getAvgFrameRate()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getAvgFrameRate()
                .getValue()
                ?.toString(),
            test_media_metadata.streams[0].avg_frame_rate
        );
    });

    it('getTimeBase()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getTimeBase()
                .getValue()
                ?.toString(),
            test_media_metadata.streams[0].time_base
        );
    });

    it('getStartPTS()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getStartPTS().getValue(),
            test_media_metadata.streams[0].start_pts
        );
    });

    it('getStartTime()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getStartTime().getValue(),
            test_media_metadata.streams[0].start_time
        );
    });

    it('getDurationTS()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getDurationTS().getValue(),
            test_media_metadata.streams[0].duration_ts
        );
    });

    it('getDuration()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getDuration().getValue(),
            test_media_metadata.streams[0].duration
        );
    });

    it('getBitRate()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getBitRate().getValue(),
            test_media_metadata.streams[0].bit_rate
        );
    });

    it('getNbFrames()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getVideoStream()?.getNbFrames().getValue(),
            test_media_metadata.streams[0].nb_frames
        );
    });

    it('getDisposition()', () => {
        const media = new Media(test_media_metadata as unknown);
        const disposition = Object.fromEntries(
            media
                .getStreams()
                ?.getVideoStream()
                ?.getDisposition()
                .getValue() as Map<string, string>
        );
        assert.deepEqual(disposition, test_media_metadata.streams[0].disposition);
    });

    it('getTags()', () => {
        const media = new Media(test_media_metadata as unknown);
        const disposition = Object.fromEntries(
            media.getStreams()?.getVideoStream()?.getTags().getValue() as Map<
                string,
                string
            >
        );
        assert.deepEqual(disposition, test_media_metadata.streams[0].tags);
    });
});
