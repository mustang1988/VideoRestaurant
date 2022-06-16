export class Config {
    log4js_layout = {
        type: 'pattern',
        pattern: '%[[%d{yyyy/MM/dd hh:mm:ss.SSS}][%p][%c][%f{1}:%l,%o]: %m%]',
    };
    log4js = {
        appenders: {
            console: { type: 'stdout', layout: this.log4js_layout },
            server: {
                type: 'file',
                layout: this.log4js_layout,
                filename: 'logs/server.log',
            },
            chef: {
                type: 'file',
                layout: this.log4js_layout,
                filename: 'logs/chef.log',
            },
            assistant: { type: 'file', filename: 'logs/assistant.log' },
        },
        categories: {
            default: {
                appenders: ['console'],
                level: 'trace',
                enableCallStack: true,
            },
            server: {
                appenders: ['server', 'console'],
                level: 'trace',
                enableCallStack: true,
            },
            chef: {
                appenders: ['chef', 'console'],
                level: 'trace',
                enableCallStack: true,
            },
            assistant: {
                appenders: ['assistant', 'console'],
                level: 'trace',
                enableCallStack: true,
            },
        },
    };

    static getInstance() {
        return new Config();
    }

    getLog4jsConfig() {
        return this.log4js;
    }
}
