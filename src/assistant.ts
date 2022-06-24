// import log4js from 'log4js';
import dotenv from 'dotenv';
import log4js from 'log4js';
import { join } from 'path';
dotenv.config({ path: join(process.cwd(), 'assistant.env') });

const {
    CHEF_HOST,
    CHEF_PORT,
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
        assistant: { type: 'file', filename: LOG_FILE, layout: log_layout },
    },
    categories: {
        default: {
            appenders: ['stdout'],
            level: LOG_LEVEL as string,
        },
        assistant: {
            appenders: ['stdout', 'assistant'],
            level: LOG_LEVEL as string,
        },
    },
});

const logger = log4js.getLogger('assistant');
logger.info('info sample', '');
logger.debug('debug sample', '');
logger.error('error sample', '');
