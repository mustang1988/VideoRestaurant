import Redis from 'ioredis';
import {
    IQueueConfig,
    IQueueConsumer,
    IQueueMessage,
} from '../../types/Interfaces';

export abstract class QueueConsumer<T> implements IQueueConsumer<T> {
    #queue: Redis;
    #name: string;

    constructor(config: IQueueConfig) {
        this.#name = config.name;
        this.#queue = new Redis(config.port, config.host, {
            password: config.pwd,
        });
    }

    getQueue(): Redis {
        return this.#queue;
    }

    getName(): string {
        return this.#name;
    }

    abstract pop(): Promise<IQueueMessage<T> | null>;
}
