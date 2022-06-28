import _ from 'lodash';
import { IQueueMessage, ITask } from '../../types/Interfaces';
import { TaskQueueMessage } from '../message/TaskQueueMessage';
import { QueueConsumer } from './QueueConsumer';

export class TaskQueueConsumer extends QueueConsumer<ITask> {
    async pop(): Promise<IQueueMessage<ITask> | null> {
        const msg = await this.getQueue().rpop(this.getName());
        if (_.isNil(msg)) {
            return null;
        }
        return new TaskQueueMessage(msg);
    }
}
