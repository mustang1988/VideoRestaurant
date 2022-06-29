import { IRedisConfig } from '../../types/Interfaces';
import { createClient } from '@redis/client';
import Redis from 'ioredis';
export const client = createClient();
export type RedisClientType = typeof client;
export class RedisClientFactory {
    static async CreateClient(
        config: IRedisConfig,
        auto_connect = true
    ): Promise<RedisClientType> {
        const { host, port, username, pwd } = config;
        const url =
            username && pwd
                ? `redis://${username}:${pwd}@${host}:${port}`
                : `redis://${host}:${port}`;
        const client = createClient({ url: url });
        auto_connect && (await client.connect());
        return client;
    }

    static CreateIORedisClient(config: IRedisConfig): Redis {
        const { host, port, username, pwd } = config;
        const client = new Redis(port, host, { username, password: pwd });
        return client;
    }
}
