import { LoggerFactory } from './logger/factory/LoggerFactory';

const logger = LoggerFactory.getLogger('waiter');
logger.info('info sample', '');
logger.debug('debug sample', '');
logger.error('error sample', '');
