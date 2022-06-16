export class Config {
    log4js_layout = {
        type: 'pattern',
        pattern: '%[[%d][%p][%c]: %m%]',
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
            default: { appenders: ['console'], level: 'trace' },
            server: { appenders: ['server', 'console'], level: 'trace' },
            chef: { appenders: ['chef', 'console'], level: 'trace' },
            assistant: {
                appenders: ['assistant', 'console'],
                level: 'trace',
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
