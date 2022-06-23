import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../../src/media/Media';
import mock_media from '../assets/mock_media.json';

describe('MediaAudioStream.ts', () => {
    it('getSampleFmt()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getSampleFmt().getValue(),
            mock_media.streams[1].sample_fmt
        );
    });

    it('getSampleRate()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getSampleRate().getValue(),
            mock_media.streams[1].sample_rate
        );
    });

    it('getChannels()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getChannels().getValue(),
            mock_media.streams[1].channels
        );
    });

    it('getChannelLayout()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getChannelLayout().getValue(),
            mock_media.streams[1].channel_layout
        );
    });

    it('getBitsPerSample()', () => {
        const media = new Media(mock_media as unknown);
        assert.equal(
            media.getStreams()?.getAudioStream()?.getBitsPerSample().getValue(),
            mock_media.streams[1].bits_per_sample
        );
    });
});
