import { existsSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import { IWaiter, IWaiterConfig } from '../types/Interfaces';
import Redis from 'ioredis';
import { Logger } from 'log4js';
import { LoggerFactory } from '../logger/factory/LoggerFactory';

export class Waiter implements IWaiter {
    #config: IWaiterConfig;
    #task_queue: Redis;
    #callback_queue: Redis;
    #database: Redis;
    #logger: Logger;
    // #server:

    constructor() {
        this.#logger = LoggerFactory.getLogger('waiter');
        this.#loadEnv();
    }

    getTaskQueue(): Redis {
        return this.#task_queue;
    }

    getCallbackQueue(): Redis {
        return this.#callback_queue;
    }

    getDatabase(): Redis {
        return this.#database;
    }

    async start(): Promise<void> {
        this.#logger.info('[start()] Waiter initialize');
        this.#init()
            .then(() => {
                this.#logger.info('[start()] Waiter has been initialized');
            })
            .catch((error) => {
                this.#logger.error('[start()] Waiter init with error: ', error);
            });
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

    #init(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.#task_queue = new Redis(
                this.#config.queue.task.port,
                this.#config.queue.task.host,
                { lazyConnect: true }
            );
            this.#callback_queue = new Redis(
                this.#config.queue.callback.port,
                this.#config.queue.callback.host,
                { lazyConnect: true }
            );
            this.#database = new Redis(
                this.#config.database.port,
                this.#config.database.host,
                { lazyConnect: true }
            );
            this.#task_queue.connect((error, result) => {
                if (error && !result) {
                    this.#logger.error(
                        '[init()] Task queue connection init with error: ',
                        error
                    );
                    this.#task_queue.disconnect();
                    reject(error);
                }
            });
            this.#callback_queue.connect((error, result) => {
                if (error && !result) {
                    this.#logger.error(
                        '[init()] Callback queue connection init with error: ',
                        error
                    );
                    this.#callback_queue.disconnect();
                    reject(error);
                }
            });
            this.#database.connect((error, result) => {
                if (error && !result) {
                    this.#logger.error(
                        '[init()] Database connection init with error: ',
                        error
                    );
                    this.#database.disconnect();
                    reject(error);
                }
            });
            resolve();
        });
    }

    async #loadProto(): Promise<void> {
        //TODO
        this.#logger.info('[loadProto()] Waiter load proto');
    }
}
