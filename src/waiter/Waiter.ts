import { Config } from '../config/Config';
import { IServiceConfig } from '../types/config/IConfig';
import { IQueue } from '../types/queue/IQueue';

export class Waiter {
    #config: IServiceConfig;
    #taskQueue: IQueue;
    #resultQueue: IQueue;
    constructor() {
        this.#config = new Config().getWaiterConfig();
    }
}
