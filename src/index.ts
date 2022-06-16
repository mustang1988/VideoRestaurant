import * as Log4js from 'log4js';
import { Config } from './config/Config';

Log4js.configure(Config.getInstance().getLog4jsConfig());

const logger = Log4js.getLogger('server');
logger.trace('Here trace log in index.ts', logger);
logger.debug('Here debug log in index.ts', logger);
logger.info('Here info log in index.ts', logger);
logger.warn('Here warn log in index.ts', logger);
logger.error('Here error log in index.ts', logger);
