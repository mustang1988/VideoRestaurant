import { existsSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import { IWaiter, IWaiterConfig } from '../types/Interfaces';
import { Logger } from 'log4js';
import { LoggerFactory } from '../logger/factory/LoggerFactory';
import {
    RedisClientFactory,
    RedisClientType,
} from '../redis/factory/RedisClientFactory';
export class Waiter implements IWaiter {
    #config: IWaiterConfig;
    #logger: Logger;
    #task_queue: RedisClientType;
    #callback_queue: RedisClientType;
    #database: RedisClientType;
    // #server:

    constructor() {
        this.#logger = LoggerFactory.GetLogger('waiter');
        this.#loadEnv();
    }

    getTaskQueue(): RedisClientType {
        return this.#task_queue;
    }

    getCallbackQueue(): RedisClientType {
        return this.#callback_queue;
    }

    getDatabase(): RedisClientType {
        return this.#database;
    }

    async start(): Promise<void> {
        this.#logger.info('[start()] Waiter initialize');
        this.#init()
            .then(() => {
                this.#logger.info('init success');
            })
            .catch((e) => {
                this.#logger.error(e);
            });

        // .then(() => {
        //     this.#logger.info('[start()] Waiter has been initialized');
        // })
        // .catch((error) => {
        //     this.#logger.error('[start()] Waiter init with error: ', error);
        // });
        // .then(() => {
        //     // TODO
        //     // start GRPC service listening
        //     // start callback queue listening
        // })
        // .catch((error) => {
        //     this.#logger.error('[start()] Waiter start with error: ', error);
        // });
    }

    #loadEnv() {
        const env_path = join(__dirname, '..', '..', 'waiter.env');
        existsSync(env_path) && dotenv.config({ path: env_path });
        const waiter_config: IWaiterConfig = {
            service: { port: parseInt(process.env.WAITER_PORT || '9000') },
            queue: {
                task: {
                    host: process.env.TASK_QUEUE_HOST || 'localhost',
                    port: parseInt(process.env.TASK_QUEUE_PORT || '6379'),
                    name: process.env.TASK_QUEUE_NAME || 'queue:task',
                    pwd: process.env.TASK_QUEUE_PWD,
                    username: process.env.TASK_QUEUE_USERNAME,
                },
                callback: {
                    host: process.env.CALLBACK_QUEUE_HOST || 'localhost',
                    port: parseInt(process.env.CALLBACK_QUEUE_PORT || '6379'),
                    name: process.env.CALLBACK_QUEUE_NAME || 'queue:callback',
                    pwd: process.env.CALLBACK_QUEUE_PWD,
                    username: process.env.CALLBACK_QUEUE_USERNAME,
                },
            },
            database: {
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '6379'),
                pwd: process.env.DB_PWD,
                username: process.env.DB_USERNAME,
            },
        };
        this.#logger.info('Waiter config: ', waiter_config);
        this.#config = waiter_config;
    }

    async #init(): Promise<void> {
        this.#task_queue = await RedisClientFactory.CreateClient(
            this.#config.queue.task
        );
        this.#callback_queue = await RedisClientFactory.CreateClient(
            this.#config.queue.callback
        );
        this.#database = await RedisClientFactory.CreateClient(
            this.#config.database
        );
        return;
    }

    // #init(): Promise<unknown> {
    //     // this.#task_queue = new Redis(
    //     //     this.#config.queue.task.port,
    //     //     this.#config.queue.task.host,
    //     //     { lazyConnect: true }
    //     // );
    //     // this.#task_queue.connect().catch((e) => {
    //     //     console.error('task_queue: ', e);
    //     //     this.#task_queue?.disconnect(false);
    //     // });
    //     // this.#callback_queue = new Redis(
    //     //     this.#config.queue.callback.port,
    //     //     this.#config.queue.callback.host,
    //     //     { lazyConnect: true }
    //     // );
    //     // this.#callback_queue.connect().catch((e) => {
    //     //     console.error('callback_queue: ', e);
    //     //     this.#callback_queue?.disconnect(false);
    //     // });
    //     // this.#database = new Redis(
    //     //     this.#config.database.port,
    //     //     this.#config.database.host,
    //     //     { lazyConnect: true }
    //     // );
    //     // this.#database.connect().catch((e) => {
    //     //     console.error('database: ', e);
    //     //     this.#database?.disconnect(false);
    //     // });
    //     // return new Promise((resolve, reject) => {
    //     //     resolve('1');
    //     // });

    //     // return Promise.all([
    //     //     this.#task_queue.connect(),
    //     //     this.#callback_queue.connect(),
    //     //     this.#database.connect(),
    //     // ]);

    //     // return new Promise((resolve, reject) => {
    //     //     const errors: Error[] = [];

    //     //     this.#task_queue.connect().catch((error) => {
    //     //         this.#task_queue?.disconnect(false);
    //     //         errors.push(error);
    //     //     });
    //     //     // this.#task_queue.on('error', (error) => {
    //     //     //     this.#task_queue?.disconnect(false);
    //     //     //     // this.#logger.error('task_queue error: ', error instanceof Error);
    //     //     //     errors.push(error);
    //     //     // });
    //     //     // this.#callback_queue = new Redis(
    //     //     //     this.#config.queue.callback.port,
    //     //     //     this.#config.queue.callback.host
    //     //     // );
    //     //     // this.#callback_queue.on('error', (error) => {
    //     //     //     this.#callback_queue?.disconnect(false);
    //     //     //     // this.#logger.error('callback_queue error: ', error);
    //     //     //     errors.push(error);
    //     //     // });
    //     //     // this.#database = new Redis(
    //     //     //     this.#config.database.port,
    //     //     //     this.#config.database.host
    //     //     // );
    //     //     // this.#database.on('error', (error) => {
    //     //     //     this.#database?.disconnect(false);
    //     //     //     // this.#logger.error('database error: ', error);
    //     //     //     errors.push(error);
    //     //     // });
    //     //     if (_.isEmpty()) {
    //     //         resolve();
    //     //     }
    //     //     reject(errors);
    //     // });
    // }

    // async #loadProto(): Promise<void> {
    //     //TODO
    //     this.#logger.info('[loadProto()] Waiter load proto');
    // }
}
