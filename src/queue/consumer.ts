import { Queue } from './Queue';
import { IForkRequestMessage } from '../types/Interfaces';

process.on('message', (request: IForkRequestMessage) => {
    new Queue(request.config).pop().then((response) => {
        process.send && process.send(response);
    });
});
