import { IForkRequestMessage } from '../types/Interfaces';
import { Queue } from './Queue';

process.on('message', (request: IForkRequestMessage) => {
    request.message &&
        new Queue(request.config).push(request.message).then((response) => {
            process.send && process.send(response);
        });
});
