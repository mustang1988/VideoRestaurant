import { IMediaAudioStream } from '../../types/Interfaces';
import { Stream } from './Stream';

export class AudioStream extends Stream implements IMediaAudioStream {
    constructor(metadata: JSON) {
        super(metadata);
    }
    getSampleRate(): number {
        throw new Error('Method not implemented.');
    }
}
