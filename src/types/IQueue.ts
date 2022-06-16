export interface ITaskQueueMessage {
    getId(): string;
}

export interface IQueue {
    pop(): Promise<ITaskQueueMessage | null>;
    push(msg: ITaskQueueMessage): Promise<void>;
}
