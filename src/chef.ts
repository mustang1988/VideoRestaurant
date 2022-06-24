import { LoggerFactory } from './logger/factory/LoggerFactory';

const logger = LoggerFactory.getLogger('chef');
logger.info('info sample', '');
logger.debug('debug sample', '');
logger.error('error sample', '');
