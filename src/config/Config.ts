import { Configuration, Layout } from 'log4js';
import { Dialect } from 'sequelize/types';
import {
    IConfig,
    IDatabaseConfig,
    IQueueConfig,
    IServiceConfig,
} from '../types/config/IConfig';

export class Config implements IConfig {
    getLoggerConfig(): Configuration {
        const {
            LOG_LAYOUT = '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}][%p][%c][%f{1}:%l,%o]: %m%]',
            WAITER_LOG_FILE = 'log/waiter.log',
            CHEF_LOG_FILE = 'log/chef.log',
            ASSISTANT_LOG_FILE = 'log/assistant.log',
            LOG_LEVEL = 'debug',
        } = process.env;
        const layout: Layout = {
            type: 'pattern',
            pattern: LOG_LAYOUT,
        };
        return {
            appenders: {
                console: { type: 'stdout', layout: layout },
                server: {
                    type: 'file',
                    layout: layout,
                    filename: WAITER_LOG_FILE,
                },
                chef: {
                    type: 'file',
                    layout: layout,
                    filename: CHEF_LOG_FILE,
                },
                assistant: { type: 'file', filename: ASSISTANT_LOG_FILE },
            },
            categories: {
                default: {
                    appenders: ['console'],
                    level: LOG_LEVEL,
                    enableCallStack: true,
                },
                server: {
                    appenders: ['server', 'console'],
                    level: LOG_LEVEL,
                    enableCallStack: true,
                },
                chef: {
                    appenders: ['chef', 'console'],
                    level: LOG_LEVEL,
                    enableCallStack: true,
                },
                assistant: {
                    appenders: ['assistant', 'console'],
                    level: LOG_LEVEL,
                    enableCallStack: true,
                },
            },
        };
    }

    getDatabaseConfig(): IDatabaseConfig {
        const {
            DB_HOST = 'localhost',
            DB_PORT = '3306',
            DB_USER = 'root',
            DB_PASSWORD = 'dell_456',
            DB_DATABASE = 'video_chef',
            DB_DIALECT = 'mysql',
        } = process.env;
        return {
            host: DB_HOST,
            port: parseInt(DB_PORT),
            username: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            dialect: DB_DIALECT as Dialect,
        };
    }

    getTaskQueueConfig(): IQueueConfig {
        const {
            QUEUE_HOST = 'localhost',
            QUEUE_PORT = '6379',
            QUEUE_USER = 'root',
            QUEUE_PASSWORD = 'passw0rd@redis',
            QUEUE_NAME_TASK = 'queue:task',
        } = process.env;
        return {
            host: QUEUE_HOST,
            port: parseInt(QUEUE_PORT),
            username: QUEUE_USER,
            password: QUEUE_PASSWORD,
            name: QUEUE_NAME_TASK,
        };
    }

    getResultQueueConfig(): IQueueConfig {
        const {
            QUEUE_HOST = 'localhost',
            QUEUE_PORT = '6379',
            QUEUE_USER = 'root',
            QUEUE_PASSWORD = 'passw0rd@redis',
            QUEUE_NAME_RESULT = 'queue:result',
        } = process.env;
        return {
            host: QUEUE_HOST,
            port: parseInt(QUEUE_PORT),
            username: QUEUE_USER,
            password: QUEUE_PASSWORD,
            name: QUEUE_NAME_RESULT,
        };
    }

    getWaiterConfig(): IServiceConfig {
        const { WAITER_PORT = '9098' } = process.env;
        return {
            host: '0.0.0.0',
            port: parseInt(WAITER_PORT),
        };
    }

    getChefConfig(): IServiceConfig {
        const { CHEF_PORT = '9099' } = process.env;
        return {
            host: '0.0.0.0',
            port: parseInt(CHEF_PORT),
        };
    }

    getAssistantConfig(): IServiceConfig {
        const { CHEF_HOST = '0.0.0.0', CHEF_PORT = '9099' } = process.env;
        return {
            host: CHEF_HOST,
            port: parseInt(CHEF_PORT),
        };
    }
}
