import _ from 'lodash';
import { IMediaAudioStream, IProperty } from '../../types/Interfaces';
import { NumberProperty } from '../properties/NumberProperty';
import { StringProperty } from '../properties/StringProperty';
import { Stream } from './Stream';

export class MediaAudioStream extends Stream implements IMediaAudioStream {
    #sample_fmt: IProperty<string | null>;
    #sample_rate: IProperty<number | null>;
    #channels: IProperty<number | null>;
    #channel_layout: IProperty<string | null>;
    #bits_per_sample: IProperty<number | null>;

    constructor(metadata: unknown) {
        super(metadata);
        this.#sample_fmt = new StringProperty(
            _.get(metadata, 'sample_fmt', null)
        );
        this.#sample_rate = new NumberProperty(
            _.get(metadata, 'sample_rate', null)
        );
        this.#channels = new NumberProperty(_.get(metadata, 'channels', null));
        this.#channel_layout = new StringProperty(
            _.get(metadata, 'channel_layout', null)
        );
        this.#bits_per_sample = new NumberProperty(
            _.get(metadata, 'bits_per_sample', null)
        );
    }

    getSampleFmt(): IProperty<string | null> {
        return this.#sample_fmt;
    }

    getSampleRate(): IProperty<number | null> {
        return this.#sample_rate;
    }

    getChannels(): IProperty<number | null> {
        return this.#channels;
    }

    getChannelLayout(): IProperty<string | null> {
        return this.#channel_layout;
    }

    getBitsPerSample(): IProperty<number | null> {
        return this.#bits_per_sample;
    }
}
