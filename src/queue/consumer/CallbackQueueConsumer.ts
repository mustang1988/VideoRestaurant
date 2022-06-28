import { IQueueMessage, ITask } from '../../types/Interfaces';
import { CallbackQueueMessage } from '../message/CallbackQueueMessage';
import { QueueConsumer } from './QueueConsumer';

export class CallbackQueueConsumer extends QueueConsumer<ITask> {
    async pop(): Promise<IQueueMessage<ITask> | null> {
        const msg = await this.getQueue().rpop(this.getName());
        if (_.isNil(msg)) {
            return null;
        }
        return new CallbackQueueMessage(msg);
    }
}
