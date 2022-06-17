import { Configuration } from 'log4js';
import { Dialect } from 'sequelize/types';

export interface IServiceConfig {
    host: string;
    port: number;
}
export interface IDatabaseConfig extends IServiceConfig {
    username: string;
    password: string;
    database: string;
    dialect: Dialect;
}

export interface IQueueConfig extends IServiceConfig {
    username: string;
    password: string;
    name: string;
}

export interface IConfig {
    getLoggerConfig(): Configuration;
    getDatabaseConfig(): IDatabaseConfig;
    getTaskQueueConfig(): IQueueConfig;
    getResultQueueConfig(): IQueueConfig;
    getWaiterConfig(): IServiceConfig;
    getChefConfig(): IServiceConfig;
    getAssistantConfig(): IServiceConfig;
}
