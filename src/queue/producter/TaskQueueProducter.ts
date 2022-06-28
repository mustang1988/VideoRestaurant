import { ITask } from '../../types/Interfaces';
import { QueueProducter } from './QueueProducter';

export class TaskQueueProducter extends QueueProducter<ITask> {}
