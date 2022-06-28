import Redis from 'ioredis';
import {
    IQueueConfig,
    IQueueMessage,
    IQueueProducter,
} from '../../types/Interfaces';

export class QueueProducter<T> implements IQueueProducter<T> {
    #queue: Redis;
    #name: string;

    constructor(config: IQueueConfig) {
        this.#queue = new Redis(config.port, config.host, {
            password: config.pwd,
        });
        this.#name = config.name;
    }

    getQueue(): Redis {
        return this.#queue;
    }

    getName(): string {
        return this.#name;
    }

    async push(message: IQueueMessage<T>): Promise<boolean> {
        const result = await this.#queue.lpush(this.#name, message.toString());
        return result === 1;
    }
}
