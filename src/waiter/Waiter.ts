import { Config } from '../config/Config';
import { IServiceConfig } from '../types/IConfig';
import { IQueue } from '../types/IQueue';

export class Waiter {
    #config: IServiceConfig;
    #taskQueue: IQueue;
    #resultQueue: IQueue;
    constructor() {
        this.#config = new Config().getWaiterConfig();
    }
}
