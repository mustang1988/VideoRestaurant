import { IQueue, ITaskQueueMessage } from '../types/queue/IQueue';
import { createClient } from 'redis';
import { RedisClientType } from '@redis/client';
import { IQueueConfig } from '../types/config/IConfig';
export class RedisQueue implements IQueue {
    #client: RedisClientType;
    #name: string;
    constructor(config: IQueueConfig) {
        const { host, port, username, password, name } = config;
        this.#client = createClient({
            url: `redis://${username}:${password}@${host}:${port}`,
        });
        this.#name = name;
    }

    async pop(): Promise<ITaskQueueMessage | null> {
        throw new Error('Method not implemented.');
    }

    async push(msg: ITaskQueueMessage): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
