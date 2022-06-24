// import log4js from 'log4js';
import { LoggerFactory } from './logger/factory/LoggerFactory';

const logger = LoggerFactory.getLogger('assistant');
logger.info('info sample', '');
logger.debug('debug sample', '');
logger.error('error sample', '');
