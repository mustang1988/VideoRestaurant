import * as Log4js from 'log4js';
import { Config } from './config/Config';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { ENodeStatus } from './types/enums/EStatus';

dotenv.config();
const config = new Config();

Log4js.configure(config.getLoggerConfig());

const logger = Log4js.getLogger('server');
// logger.trace('Here trace log in index.ts', nanoid());
// logger.debug('Here debug log in index.ts', nanoid());
// logger.info('Here info log in index.ts', nanoid());
// logger.warn('Here warn log in index.ts', nanoid());
// logger.error('Here error log in index.ts', nanoid());

// const dbConfig = config.getDatabaseConfig();
// const db = new Sequelize(
//     dbConfig.database,
//     dbConfig.username,
//     dbConfig.password,
//     {
//         host: dbConfig.host,
//         dialect: dbConfig.dialect,
//     }
// );
// db.addModels([path.join(__dirname, 'models')]);
// db.models.Node.create(
//     {
//         id: nanoid(),
//         node_ip: '10.0.0.2',
//         node_registed_at: new Date(),
//         node_status: ENodeStatus.DISCONNECTED,
//     },
//     { raw: true }
// ).then((res) => {
//     logger.debug(res);
// });
