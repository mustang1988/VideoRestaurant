import * as Log4js from 'log4js';
import { Config } from './config/Config';
import dotenv from "dotenv"
import { nanoid } from 'nanoid'

dotenv.config()
const config = new Config();

Log4js.configure(config.getLoggerConfig());

const logger = Log4js.getLogger('server');
logger.trace('Here trace log in index.ts', nanoid());
logger.debug('Here debug log in index.ts', nanoid());
logger.info('Here info log in index.ts', nanoid());
logger.warn('Here warn log in index.ts', nanoid());
logger.error('Here error log in index.ts', nanoid());
