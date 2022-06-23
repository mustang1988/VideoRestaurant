import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../../src/media/Media';
import test_media_metadata from '../assets/test_media_metadata.json';

describe('MediaAudioStream.ts', () => {
    it('getSampleFmt()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getSampleFmt().getValue(),
            test_media_metadata.streams[1].sample_fmt
        );
    });

    it('getSampleRate()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getSampleRate().getValue(),
            test_media_metadata.streams[1].sample_rate
        );
    });

    it('getChannels()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getChannels().getValue(),
            test_media_metadata.streams[1].channels
        );
    });

    it('getChannelLayout()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getChannelLayout().getValue(),
            test_media_metadata.streams[1].channel_layout
        );
    });

    it('getBitsPerSample()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getBitsPerSample().getValue(),
            test_media_metadata.streams[1].bits_per_sample
        );
    });
});
