import { ITaskQueueMessage } from '../types/queue/IQueue';

export class TaskQueueMessage implements ITaskQueueMessage {
    #id: string;

    constructor(id: string) {
        this.#id = id;
    }

    getId(): string {
        return this.#id;
    }
}
