import log4js, { Layout, Logger } from 'log4js';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import _ from 'lodash';

export class LoggerFactory {
    static getLogger(module: string): Logger {
        // load env file if it is exist
        const env_file = join(process.cwd(), `${module}.env`);
        existsSync(env_file) && dotenv.config({ path: env_file });

        // handle default value
        const LOG_FILE = _.get(
            process.env,
            `${module.toUpperCase()}_LOG_FILE`,
            `logs/${module}.log`
        );
        const LOG_LAYOUT = _.get(
            process.env,
            `${module.toUpperCase()}_LOG_LAYOUT`,
            '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}][%p][%c][%f{1}:%l,%o] => %m%]'
        );
        const LOG_LEVEL = _.get(
            process.env,
            `${module.toUpperCase()}_LOG_LEVEL`,
            'DEBUG'
        );

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
