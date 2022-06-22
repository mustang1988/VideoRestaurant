import _ from 'lodash';
import {
    IMediaAudioStream,
    IMediaStreams,
    IMediaVideoStream,
} from '../types/Interfaces';

export class MediaStreams implements IMediaStreams {
    #video_stream: IMediaVideoStream | null;
    #audio_stream: IMediaAudioStream | null;

    constructor(metadata: JSON) {
        this.#video_stream = null;
        this.#audio_stream = null;
        console.log(metadata);
        // this.#video_stream = _.isNil(video_stream_metadata)
        //     ? null
        //     : new MediaVideoStream(video_stream_metadata);

        // const audio_stream_metadata = _.find(
        //     metadata,
        //     (data) => _.get(data, 'codec_type') === 'audio'
        // );
    }

    getVideoStream(): IMediaVideoStream | null {
        return this.#video_stream;
    }

    getAudioStream(): IMediaAudioStream | null {
        return this.#audio_stream;
    }
}
