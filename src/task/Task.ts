import _ from 'lodash';
import { nanoid } from 'nanoid';
import { ETaskStatus } from '../types/Enums';
import { IJob, ITask } from '../types/Interfaces';

export class Task implements ITask {
    #id: string;
    #input: string;
    #metadata: string;
    #status: ETaskStatus;
    #jobs: IJob[];

    constructor() {
        this.#id = nanoid();
        this.#metadata = '';
        this.#status = ETaskStatus.QUEUING;
        this.#jobs = [];
    }

    getJobs(): IJob[] {
        return this.#jobs;
    }

    setJobs(jobs: IJob[]): void {
        this.#jobs = jobs;
    }

    getId(): string {
        return this.#id;
    }

    getInput(): string {
        return this.#input;
    }

    getMetadata(): string {
        return this.#metadata;
    }

    getStatus(): ETaskStatus {
        return this.#status;
    }

    setInput(input: string): void {
        this.#input = input;
    }

    setMetadata(metadata: string): void {
        this.#metadata = metadata;
    }

    setStatus(status?: ETaskStatus | undefined): void {
        if (!_.isNil(status)) {
            this.#status = status;
        } else {
            this.#nextStatus();
        }
    }

    #nextStatus(): void {
        // TODO
        switch (this.#status) {
            case ETaskStatus.QUEUING:
                this.#status = ETaskStatus.ANALYZING;
                break;
            case ETaskStatus.ANALYZING:
                if (!_.isEmpty(this.#metadata)) {
                    this.#status = ETaskStatus.PREPARING;
                }
                break;
            case ETaskStatus.PREPARING:
                if (!_.isEmpty(this.#jobs)) {
                    this.#status = ETaskStatus.RUNNING;
                }
                break;
            case ETaskStatus.RUNNING:
                // let finished = true;
                // for (const job of this.#jobs) {
                //     // finished =
                // }
                // if (finished) {
                //     this.#status = ETaskStatus.COMPOSITING;
                // }
                break;
            case ETaskStatus.COMPOSITING:
            // TODO
            // default:
            // this.#status =
        }
    }
}
