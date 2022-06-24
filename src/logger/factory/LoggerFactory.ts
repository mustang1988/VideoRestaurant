import log4js, { Layout, Logger } from 'log4js';
import dotenv from 'dotenv';
import path, { dirname, join } from 'path';
import _ from 'lodash';

export class LoggerFactory {
    static getLogger(module: string): Logger {
        // load env file
        const env_file = join(process.cwd(), `${module}.env`);
        dotenv.config({ path: env_file });

        // get log conf from sys env
        let { LOG_FILE, LOG_LAYOUT, LOG_LEVEL } = process.env;

        // handle default value for undefined value
        LOG_FILE = !_.isNil(LOG_FILE) ? LOG_FILE : `logs/${module}.log`;
        LOG_LAYOUT = !_.isNil(LOG_LAYOUT)
            ? LOG_LAYOUT
            : '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}][%p][%c][%f{1}:%l,%o] => %m%]';
        LOG_LEVEL = !_.isNil(LOG_LEVEL) ? LOG_LEVEL : 'DEBUG';

        // build config for log4js
        const layout: Layout = {
            type: 'pattern',
            pattern: LOG_LAYOUT,
        };
        const appenders = {
            stdout: { type: 'stdout', layout: layout },
            file: {
                type: 'file',
                filename: LOG_FILE,
                layout: layout,
            },
            all: {
                type: 'file',
                filename: join(dirname(LOG_FILE), 'all.log'),
                layout: layout,
            },
        };
        const categories = {
            default: {
                appenders: ['stdout'],
                level: LOG_LEVEL as string,
            },
        };
        _.set(categories, module, {
            appenders: ['stdout', 'file', 'all'],
            level: LOG_LEVEL as string,
        });
        log4js.configure({ appenders, categories });
        // get logger instance from log4js
        return log4js.getLogger(module);
    }
}
