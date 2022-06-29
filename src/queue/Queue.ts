import Redis from 'ioredis';
import { RedisClientFactory } from '../redis/factory/RedisClientFactory';
import { IQueue, IQueueConfig } from '../types/Interfaces';

export class Queue implements IQueue {
    #queue: Redis;
    #name: string;

    constructor(config: IQueueConfig) {
        this.#queue = RedisClientFactory.CreateIORedisClient(config);
        this.#name = config.name;
    }
    async pop(): Promise<string | null> {
        return await this.#queue.rpop(this.getName());
    }

    async push(msg: string): Promise<boolean> {
        const push_return = await this.#queue.lpush(this.#name, msg);
        return push_return === 1;
    }

    getQueue(): Redis {
        return this.#queue;
    }

    getName(): string {
        return this.#name;
    }
}
