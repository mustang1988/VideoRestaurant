import { existsSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import { IWaiter, IWaiterConfig } from '../types/Interfaces';
import Redis from 'ioredis';
import { Logger } from 'log4js';
import { LoggerFactory } from '../logger/factory/LoggerFactory';
export class Waiter implements IWaiter {
    #config: IWaiterConfig;
    #task_queue: Redis | null;
    #callback_queue: Redis | null;
    #database: Redis | null;
    #logger: Logger;
    // #server:

    constructor() {
        this.#logger = LoggerFactory.getLogger('waiter');
        this.#loadEnv();
    }

    getTaskQueue(): Redis | null {
        return this.#task_queue;
    }

    getCallbackQueue(): Redis | null {
        return this.#callback_queue;
    }

    getDatabase(): Redis | null {
        return this.#database;
    }

    async start(): Promise<void> {
        this.#logger.info('[start()] Waiter initialize');

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
        // const waiter_env = join(process.cwd(), 'waiter.env');
        // const is_env_exist = existsSync(waiter_env);
        // if (is_env_exist) {
        //     dotenv.config({ path: waiter_env, override: true });
        // }
        const waiter_config: IWaiterConfig = {
            service: { port: parseInt(process.env.WAITER_PORT || '9000') },
            queue: {
                task: {
                    host: process.env.TASK_QUEUE_HOST || 'localhost',
                    port: parseInt(process.env.TASK_QUEUE_PORT || '6379'),
                    name: process.env.TASK_QUEUE_NAME || 'queue:task',
                    pwd: process.env.TASK_QUEUE_PWD,
                },
                callback: {
                    host: process.env.CALLBACK_QUEUE_HOST || 'localhost',
                    port: parseInt(process.env.CALLBACK_QUEUE_PORT || '6379'),
                    name: process.env.CALLBACK_QUEUE_NAME || 'queue:callback',
                    pwd: process.env.CALLBACK_QUEUE_PWD,
                },
            },
            database: {
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '6379'),
                pwd: process.env.DB_PWD,
            },
        };
        this.#logger.info('Waiter config: ', waiter_config);
        this.#config = waiter_config;
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
