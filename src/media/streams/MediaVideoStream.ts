import _ from 'lodash';
import { IMediaVideoStream, IProperty, IRatio } from '../../types/Interfaces';
import { NumberProperty } from '../properties/NumberProperty';
import { RatioProperty } from '../properties/RatioProperty';
import { StringProperty } from '../properties/StringProperty';
import { Stream } from './Stream';

export class MediaVideoStream extends Stream implements IMediaVideoStream {
    #width: IProperty<number | null>;
    #height: IProperty<number | null>;
    #coded_width: IProperty<number | null>;
    #coded_height: IProperty<number | null>;
    #closed_captions: IProperty<string | null>;
    #has_b_frames: IProperty<number | null>;
    #sample_aspect_ratio: IProperty<IRatio | null>;
    #display_aspect_ratio: IProperty<IRatio | null>;
    #pix_fmt: IProperty<string | null>;
    #level: IProperty<number | null>;
    #color_range: IProperty<string | null>;
    #color_space: IProperty<string | null>;
    #color_transfer: IProperty<string | null>;
    #color_primaries: IProperty<string | null>;
    #chroma_location: IProperty<string | null>;
    #refs: IProperty<number | null>;

    constructor(metadata: unknown) {
        super(metadata);
        this.#width = new NumberProperty(_.get(metadata, 'width', null));
        this.#height = new NumberProperty(_.get(metadata, 'height', null));
        this.#coded_width = new NumberProperty(
            _.get(metadata, 'coded_width', null)
        );
        this.#coded_height = new NumberProperty(
            _.get(metadata, 'coded_height')
        );
        this.#closed_captions = new StringProperty(
            _.get(metadata, 'closed_captions', null)
        );
        this.#has_b_frames = new NumberProperty(
            _.get(metadata, 'has_b_frames', null)
        );
        this.#sample_aspect_ratio = new RatioProperty(
            _.get(metadata, 'sample_aspect_ratio', null),
            ':'
        );
        this.#display_aspect_ratio = new RatioProperty(
            _.get(metadata, 'display_aspect_ratio', null),
            ':'
        );
        this.#pix_fmt = new StringProperty(_.get(metadata, 'pix_fmt', null));
        this.#level = new NumberProperty(_.get(metadata, 'level', null));
        this.#color_range = new StringProperty(
            _.get(metadata, 'color_range', null)
        );
        this.#color_space = new StringProperty(
            _.get(metadata, 'color_space', null)
        );
        this.#color_transfer = new StringProperty(
            _.get(metadata, 'color_transfer', null)
        );
        this.#color_primaries = new StringProperty(
            _.get(metadata, 'color_primaries', null)
        );
        this.#chroma_location = new StringProperty(
            _.get(metadata, 'chroma_location', null)
        );
        this.#refs = new NumberProperty(_.get(metadata, 'refs', null));
    }

    getWidth(): IProperty<number | null> {
        return this.#width;
    }

    getHeight(): IProperty<number | null> {
        return this.#height;
    }

    getCodedWidth(): IProperty<number | null> {
        return this.#coded_width;
    }

    getCodedHeight(): IProperty<number | null> {
        return this.#coded_height;
    }

    getClosedCaptions(): IProperty<string | null> {
        return this.#closed_captions;
    }

    getHasBFrames(): IProperty<number | null> {
        return this.#has_b_frames;
    }

    getSampleAspectRatio(): IProperty<IRatio | null> {
        return this.#sample_aspect_ratio;
    }

    getDisplayAspectRatio(): IProperty<IRatio | null> {
        return this.#display_aspect_ratio;
    }

    getPixFmt(): IProperty<string | null> {
        return this.#pix_fmt;
    }

    getLevel(): IProperty<number | null> {
        return this.#level;
    }

    getColorRange(): IProperty<string | null> {
        return this.#color_range;
    }

    getColorSpace(): IProperty<string | null> {
        return this.#color_space;
    }

    getColorTransfer(): IProperty<string | null> {
        return this.#color_transfer;
    }
    getColorPrimaries(): IProperty<string | null> {
        return this.#color_primaries;
    }

    getChromaLocation(): IProperty<string | null> {
        return this.#chroma_location;
    }

    getRefs(): IProperty<number | null> {
        return this.#refs;
    }
}
