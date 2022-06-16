import { Configuration } from 'log4js';

export interface IDatabaseConfig extends IServiceConfig {
    username: string;
    password: string;
    database: string;
}

export interface IQueueConfig extends IServiceConfig {
    password: string;
}

export interface IServiceConfig {
    host: string;
    port: number;
}

export interface IConfig {
    getLoggerConfig(): Configuration;
    getDatabaseConfig(): IDatabaseConfig;
    getQueueConfig(): IQueueConfig;
    getWaiterConfig(): IServiceConfig;
    getChefConfig(): IServiceConfig;
    getAssistantConfig(): IServiceConfig;
}
