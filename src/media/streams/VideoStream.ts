import { IMediaVideoStream } from '../../types/Interfaces';
import { Stream } from './Stream';

export class MediaVideoStream extends Stream implements IMediaVideoStream {
    constructor(metadata: JSON) {
        super(metadata);
    }
    getWidth(): number {
        throw new Error('Method not implemented.');
    }
}
