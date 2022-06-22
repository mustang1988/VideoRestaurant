import _ from 'lodash';
import { IMedia, IMediaFormat, IMediaStreams } from '../types/Interfaces';
import { MediaFormat } from './MediaFormat';
import { MediaStreams } from './MediaStreams';

export class Media implements IMedia {
    #streams: IMediaStreams | null;
    #format: IMediaFormat | null;
    #metadata: never;

    constructor(metadata: never) {
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
    
    getMetadata(): never {
        return this.#metadata;
    }

    getStreams(): IMediaStreams | null {
        return this.#streams;
    }

    getFormat(): IMediaFormat | null {
        return this.#format;
    }
}
