// import log4js from 'log4js';
import dotenv from 'dotenv';
import log4js from 'log4js';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), 'chef.env') });
const {
    CHEF_PORT,
    TASK_QUEUE_HOST,
    TASK_QUEUE_PWD,
    TASK_QUEUE_PORT,
    TASK_QUEUE_NAME,
    CALLBACK_QUEUE_HOST,
    CALLBACK_QUEUE_PWD,
    CALLBACK_QUEUE_PORT,
    CALLBACK_QUEUE_NAME,
    DB_HOST,
    DB_PORT,
    DB_PWD,
    LOG_FILE,
    LOG_LEVEL,
    LOG_LAYOUT,
    HW_ACC,
} = process.env;

const log_layout = { type: 'pattern', pattern: LOG_LAYOUT };

log4js.configure({
    appenders: {
        stdout: { type: 'stdout', layout: log_layout },
        chef: { type: 'file', filename: LOG_FILE, layout: log_layout },
    },
    categories: {
        default: {
            appenders: ['stdout'],
            level: LOG_LEVEL as string,
        },
        chef: {
            appenders: ['stdout', 'chef'],
            level: LOG_LEVEL as string,
        },
    },
});

const logger = log4js.getLogger('chef');
logger.info('info sample', '');
logger.debug('debug sample', '');
logger.error('error sample', '');
