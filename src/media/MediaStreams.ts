import _ from 'lodash';
import {
    IMediaAudioStream,
    IMediaStreams,
    IMediaVideoStream,
} from '../types/Interfaces';
import { MediaAudioStream } from './streams/MediaAudioStream';
import { MediaVideoStream } from './streams/MediaVideoStream';

export class MediaStreams implements IMediaStreams {
    #video_stream: IMediaVideoStream | null;
    #audio_stream: IMediaAudioStream | null;

    constructor(metadata: never) {
        this.#video_stream = null;
        this.#audio_stream = null;
        const video_stream_metadata = _.find(
            metadata,
            (data) => _.get(data, 'codec_type') === 'video'
        ) as never;
        this.#video_stream = _.isNil(video_stream_metadata)
            ? null
            : new MediaVideoStream(video_stream_metadata);

        const audio_stream_metadata = _.find(
            metadata,
            (data) => _.get(data, 'codec_type') === 'audio'
        ) as never;
        this.#audio_stream = _.isNil(audio_stream_metadata)
            ? null
            : new MediaAudioStream(audio_stream_metadata);
    }

    getVideoStream(): IMediaVideoStream | null {
        return this.#video_stream;
    }

    getAudioStream(): IMediaAudioStream | null {
        return this.#audio_stream;
    }
}
