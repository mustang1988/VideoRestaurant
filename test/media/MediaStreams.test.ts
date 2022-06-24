import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../src/media/Media';
import mock_media from './assets/mock_media.json';
import mock_media_with_only_video_streams from './assets/mock_media_with_only_video_stream.json';
import mock_media_with_only_audio_streams from './assets/mock_media_with_only_audio_stream.json';

describe('MediaStreams.ts', () => {
    it('getVideoStream()', () => {
        const media = new Media(mock_media as unknown);
        assert.notDeepEqual(media.getStreams()?.getVideoStream(), null);
    });

    it('getVideoStream(): no video stream', () => {
        const media = new Media(mock_media_with_only_audio_streams as unknown);
        assert.equal(media.getStreams()?.getVideoStream(), null);
    });

    it('getAudioStream()', () => {
        const media = new Media(mock_media as unknown);
        assert.notDeepEqual(media.getStreams()?.getAudioStream(), null);
    });

    it('getAudioStream(): no audio stream', () => {
        const media = new Media(mock_media_with_only_video_streams as unknown);
        assert.equal(media.getStreams()?.getAudioStream(), null);
    });

    it('hasVideoStream()', () => {
        const media = new Media(mock_media as unknown);
        assert.deepEqual(media.getStreams()?.hasVideoStream(), true);
    });

    it('hasVideoStream(): false', () => {
        const media = new Media(mock_media_with_only_audio_streams as unknown);
        assert.deepEqual(media.getStreams()?.hasVideoStream(), false);
    });

    it('hasAudioStream()', () => {
        const media = new Media(mock_media as unknown);
        assert.deepEqual(media.getStreams()?.hasAudioStream(), true);
    });

    it('hasAudioStream()', () => {
        const media = new Media(mock_media_with_only_video_streams as unknown);
        assert.deepEqual(media.getStreams()?.hasAudioStream(), false);
    });
});
