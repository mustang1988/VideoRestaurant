import { IMediaStream } from '../../types/Interfaces';

export class Stream implements IMediaStream {
    constructor(metadata: JSON) {
        console.log(metadata);
    }
    getDuration(): number {
        throw new Error('Method not implemented.');
    }
}
