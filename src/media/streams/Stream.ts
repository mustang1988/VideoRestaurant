import { IMediaStream, IProperty, IRatio } from '../../types/Interfaces';
import { NumberProperty } from '../properties/NumberProperty';
import _ from 'lodash';
import { StringProperty } from '../properties/StringProperty';
import { RatioProperty } from '../properties/RatioProperty';
import { MapProperty } from '../properties/MapProperty';

export class Stream implements IMediaStream {
    #index: IProperty<number | null>;
    #codec_name: IProperty<string | null>;
    #codec_long_name: IProperty<string | null>;
    #profile: IProperty<string | null>;
    #codec_tag_string: IProperty<string | null>;
    #codec_tag: IProperty<string | null>;
    #r_frame_rate: IProperty<IRatio | null>;
    #avg_frame_rate: IProperty<IRatio | null>;
    #time_base: IProperty<IRatio | null>;
    #start_pts: IProperty<number | null>;
    #start_time: IProperty<number | null>;
    #duration_ts: IProperty<number | null>;
    #duration: IProperty<number | null>;
    #bit_rate: IProperty<number | null>;
    #nb_frames: IProperty<number | null>;
    #disposition: IProperty<Map<string, string> | null>;
    #tags: IProperty<Map<string, string> | null>;

    constructor(metadata: unknown) {
        this.#index = new NumberProperty(_.get(metadata, 'index', null));
        this.#codec_name = new StringProperty(
            _.get(metadata, 'codec_name', null)
        );
        this.#codec_long_name = new StringProperty(
            _.get(metadata, 'codec_long_name', null)
        );
        this.#profile = new StringProperty(_.get(metadata, 'profile', null));
        this.#codec_tag_string = new StringProperty(
            _.get(metadata, 'codec_tag_string', null)
        );
        this.#codec_tag = new StringProperty(
            _.get(metadata, 'codec_tag', null)
        );
        this.#r_frame_rate = new RatioProperty(
            _.get(metadata, 'r_frame_rate', null)
        );
        this.#avg_frame_rate = new RatioProperty(
            _.get(metadata, 'avg_frame_rate', null)
        );
        this.#time_base = new RatioProperty(_.get(metadata, 'time_base', null));
        this.#start_pts = new NumberProperty(
            _.get(metadata, 'start_pts', null)
        );
        this.#start_time = new NumberProperty(
            _.get(metadata, 'start_time', null)
        );
        this.#duration_ts = new NumberProperty(
            _.get(metadata, 'duration_ts', null)
        );
        this.#duration = new NumberProperty(_.get(metadata, 'duration', null));
        this.#bit_rate = new NumberProperty(_.get(metadata, 'bit_rate', null));
        this.#nb_frames = new NumberProperty(
            _.get(metadata, 'nb_frames', null)
        );
        this.#disposition = new MapProperty(
            _.get(metadata, 'disposition', null)
        );
        this.#tags = new MapProperty(_.get(metadata, 'tags', null));
    }

    getIndex(): IProperty<number | null> {
        return this.#index;
    }

    getCodecName(): IProperty<string | null> {
        return this.#codec_name;
    }

    getCodecLongName(): IProperty<string | null> {
        return this.#codec_long_name;
    }

    getProfile(): IProperty<string | null> {
        return this.#profile;
    }

    getCodecTagString(): IProperty<string | null> {
        return this.#codec_tag_string;
    }

    getCodecTag(): IProperty<string | null> {
        return this.#codec_tag;
    }

    getRFrameRate(): IProperty<IRatio | null> {
        return this.#r_frame_rate;
    }

    getAvgFrameRate(): IProperty<IRatio | null> {
        return this.#avg_frame_rate;
    }

    getTimeBase(): IProperty<IRatio | null> {
        return this.#time_base;
    }

    getStartPTS(): IProperty<number | null> {
        return this.#start_pts;
    }

    getStartTime(): IProperty<number | null> {
        return this.#start_time;
    }

    getDurationTS(): IProperty<number | null> {
        return this.#duration_ts;
    }

    getDuration(): IProperty<number | null> {
        return this.#duration;
    }

    getBitRate(): IProperty<number | null> {
        return this.#bit_rate;
    }
    getNbFrames(): IProperty<number | null> {
        return this.#nb_frames;
    }

    getDisposition(): IProperty<Map<string, string> | null> {
        return this.#disposition;
    }

    getTags(): IProperty<Map<string, string> | null> {
        return this.#tags;
    }
}
