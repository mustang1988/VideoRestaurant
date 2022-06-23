import _ from 'lodash';
import { IMediaFormat, IProperty } from '../types/Interfaces';
import { MapProperty } from './properties/MapProperty';
import { NumberProperty } from './properties/NumberProperty';
import { StringProperty } from './properties/StringProperty';

export class MediaFormat implements IMediaFormat {
    #filename: IProperty<string | null>;
    #nb_streams: IProperty<number | null>;
    #nb_programs: IProperty<number | null>;
    #format_name: IProperty<string | null>;
    #format_long_name: IProperty<string | null>;
    #start_time: IProperty<number | null>;
    #duration: IProperty<number | null>;
    #size: IProperty<number | null>;
    #bit_rate: IProperty<number | null>;
    #probe_score: IProperty<number | null>;
    #tags: IProperty<Map<string, string> | null>;

    constructor(metadata: unknown) {
        this.#filename = new StringProperty(_.get(metadata, 'filename', null));
        this.#nb_streams = new NumberProperty(
            _.get(metadata, 'nb_streams', null)
        );
        this.#nb_programs = new NumberProperty(
            _.get(metadata, 'nb_programs', null)
        );
        this.#format_name = new StringProperty(
            _.get(metadata, 'format_name', null)
        );
        this.#format_long_name = new StringProperty(
            _.get(metadata, 'format_long_name', null)
        );
        this.#start_time = new NumberProperty(
            _.get(metadata, 'start_time', null)
        );
        this.#duration = new NumberProperty(_.get(metadata, 'duration', null));
        this.#size = new NumberProperty(_.get(metadata, 'size', null));
        this.#bit_rate = new NumberProperty(_.get(metadata, 'bit_rate', null));
        this.#probe_score = new NumberProperty(
            _.get(metadata, 'probe_score', null)
        );
        this.#tags = new MapProperty(_.get(metadata, 'tags', null));
    }

    getFilename(): IProperty<string | null> {
        return this.#filename;
    }

    getNbStreams(): IProperty<number | null> {
        return this.#nb_streams;
    }

    getNbPrograms(): IProperty<number | null> {
        return this.#nb_programs;
    }

    getFormatName(): IProperty<string | null> {
        return this.#format_name;
    }

    getFormatLongName(): IProperty<string | null> {
        return this.#format_long_name;
    }

    getStartTime(): IProperty<number | null> {
        return this.#start_time;
    }

    getDuration(): IProperty<number | null> {
        return this.#duration;
    }

    getSize(): IProperty<number | null> {
        return this.#size;
    }

    getBitRate(): IProperty<number | null> {
        return this.#bit_rate;
    }

    getProbScore(): IProperty<number | null> {
        return this.#probe_score;
    }

    getTags(): IProperty<Map<string, string> | null> {
        return this.#tags;
    }
}
