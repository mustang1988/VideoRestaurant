import { Config } from '../config/Config';
import { IServiceConfig } from '../types/config/IConfig';

export class Assistant {
    #config: IServiceConfig;
    constructor() {
        this.#config = new Config().getAssistantConfig();
    }
}
