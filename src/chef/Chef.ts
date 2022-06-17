import { Sequelize } from 'sequelize/types';
import { Config } from '../config/Config';
import { IServiceConfig } from '../types/config/IConfig';
import { IQueue } from '../types/queue/IQueue';

export class Chef {
    #config: IServiceConfig;
    #database: Sequelize;
    #taskQueue: IQueue;
    #resultQueue: IQueue;
    constructor() {
        const config = new Config();
        this.#config = config.getChefConfig();
        const { database, username, password, host, dialect } =
            config.getDatabaseConfig();
        this.#database = new Sequelize(database, username, password, {
            host,
            dialect,
            timezone: '+08:00',
        });
    }

    getDatabase(): Sequelize {
        return this.#database;
    }
}
