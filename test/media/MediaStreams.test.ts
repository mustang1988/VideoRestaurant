import { describe, it } from 'mocha';
import assert from 'assert';
import { Media } from '../../src/media/Media';
import test_media_metadata from './assets/test_media_metadata.json';
import test_media_metadata_only_video_streams from './assets/test_media_metadata_only_video_stream.json';
import test_media_metadata_only_audio_streams from './assets/test_media_metadata_only_audio_stream.json';

describe('MediaStreams.ts', () => {
    it('getVideoStream()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.notDeepEqual(media.getStreams()?.getVideoStream(), null);
    });

    it('getVideoStream(): no video stream', () => {
        const media = new Media(test_media_metadata_only_audio_streams as unknown);
        assert.equal(media.getStreams()?.getVideoStream(), null);
    });

    it('getAudioStream()', () => {
        const media = new Media(test_media_metadata as unknown);
        assert.notDeepEqual(media.getStreams()?.getAudioStream(), null);
    });

    it('getAudioStream(): no audio stream', () => {
        const media = new Media(test_media_metadata_only_video_streams as unknown);
        assert.equal(media.getStreams()?.getAudioStream(), null);
    });
});
