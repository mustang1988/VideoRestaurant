import log4js, { Layout, Logger } from 'log4js';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import _ from 'lodash';

export class LoggerFactory {
    static getLogger(module: string): Logger {
        // load env file if it is exist
        const env_file = join(process.cwd(), `${module}.env`);
        existsSync(env_file) &&
            dotenv.config({ path: env_file, override: true });

        // handle default value
        const log_file: string = _.get(
            process.env,
            `${module.toUpperCase()}_LOG_FILE`,
            `logs/${module}.log`
        );
        const log_layout: string = _.get(
            process.env,
            `${module.toUpperCase()}_LOG_LAYOUT`,
            // [yyyy/MM/dd hh:mm:ss.SSS][LEVLE][CATEGORY][FILE:LINE:COLUMN] => MESSAGE
            '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}][%p][%c][%f:%l,%o] => %m%]'
        );
        const log_level: string = _.get(
            process.env,
            `${module.toUpperCase()}_LOG_LEVEL`,
            'DEBUG'
        );

        // build config for log4js
        const layout: Layout = {
            type: 'pattern',
            pattern: log_layout,
        };
        const appenders = {
            // log to console
            stdout: { type: 'stdout', layout: layout },
            // log to a specified file
            file: {
                type: 'file',
                filename: log_file,
                layout: layout,
            },
            // log all into one file
            all: {
                type: 'file',
                filename: join(dirname(log_file), 'all.log'),
                layout: layout,
            },
        };
        const categories = {
            default: {
                appenders: ['stdout'],
                level: log_level,
                enableCallStack: true,
            },
        };
        // default category log will only has std output
        module !== 'default' &&
            _.set(categories, module, {
                appenders: ['stdout', 'file', 'all'],
                level: log_level,
                enableCallStack: true,
            });
        log4js.configure({ appenders, categories, pm2: true });
        // get logger instance from log4js
        return log4js.getLogger(module);
    }
}
