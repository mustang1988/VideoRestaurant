import { ITask } from '../../types/Interfaces';
import { QueueMessage } from './QueueMessage';

export class TaskQueueMessage extends QueueMessage<ITask> {
    #task: ITask;

    constructor(msg: string) {
        super(msg);
        // TODO JSON to ITask
    }

    getBody(): ITask {
        return this.#task;
    }
}
