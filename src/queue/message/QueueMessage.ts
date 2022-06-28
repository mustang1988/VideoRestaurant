import _ from 'lodash';
import { MissingRequiredOptionError } from '../../errors/MissingRequiredOptionError';
import { EQueueMessageType } from '../../types/Enums';
import { IQueueMessage } from '../../types/Interfaces';

export class QueueMessage<T> implements IQueueMessage<T> {
    #type: EQueueMessageType;
    #body: T;

    constructor(msg: string) {
        const json_msg = JSON.parse(msg);
        const msg_in_type = _.get(json_msg, 'type');
        if (_.isNil(msg_in_type)) {
            throw new MissingRequiredOptionError('type');
        }
        this.#type =
            (msg_in_type as string) === 'task'
                ? EQueueMessageType.TASK
                : EQueueMessageType.CALLBACK;
        this.#body = _.get(json_msg, 'body');
    }

    getType(): EQueueMessageType {
        return this.#type;
    }

    getBody(): T {
        return this.#body;
    }

    toString(): string {
        const obj = { type: this.#type, body: this.#body };
        return JSON.stringify(obj);
    }
}
