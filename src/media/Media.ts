import _ from 'lodash';
import { IMedia, IMediaFormat, IMediaStreams } from '../types/Interfaces';
import { MediaFormat } from './MediaFormat';
import { MediaStreams } from './MediaStreams';

export class Media implements IMedia {
    #streams: IMediaStreams | null;
    #format: IMediaFormat | null;
    #metadata: unknown;

    // color_space, color_transfer, color_primaries
    // one of them has value below, means the video is support High Dynamic Range
    // otherwise the video is SDR(Standard Dynamic Range) video
    static HDR_FLAG: string[] = ['bt2020', 'bt2020nc', 'smpte2084'];

    constructor(metadata: unknown) {
        const format_metadata = _.get(metadata, 'format', null);
        this.#format = _.isNull(format_metadata)
            ? null
            : new MediaFormat(_.get(metadata, 'format'));
        const streams_metadata = _.get(metadata, 'streams', null);
        this.#streams = _.isNull(streams_metadata)
            ? null
            : new MediaStreams(streams_metadata);
        this.#metadata = metadata;
    }

    getMetadata(): unknown {
        return this.#metadata;
    }

    getStreams(): IMediaStreams | null {
        return this.#streams;
    }

    getFormat(): IMediaFormat | null {
        return this.#format;
    }

    isHDR(): boolean {
        if (!this.#streams?.hasVideoStream()) {
            return false;
        }
        const color_space = this.#streams
            ?.getVideoStream()
            ?.getColorSpace()
            .getValue();
        const color_primaries = this.#streams
            ?.getVideoStream()
            ?.getColorPrimaries()
            .getValue();
        const color_transfer = this.#streams
            ?.getVideoStream()
            ?.getColorTransfer()
            .getValue();
        return (
            (color_space && Media.HDR_FLAG.includes(color_space)) ||
            (color_primaries && Media.HDR_FLAG.includes(color_primaries)) ||
            (color_transfer && Media.HDR_FLAG.includes(color_transfer)) ||
            false
        );
    }
}
