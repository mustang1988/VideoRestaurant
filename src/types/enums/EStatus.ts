// status of node
export enum ENodeStatus {
    DISCONNECTED = 'DISCONNECTED',
    IDEL = 'IDEL',
    WORKING = 'WORKING',
}

// status of transcode task
export enum ETaskStatus {
    QUEUING = 'QUEUING',
    RUNNING = 'RUNNING',
    FINISHED = 'FINISHED',
    FAILED = 'FAILED',
}

// status of transcode job
export enum EJobStatus {
    RUNNING = 'RUNNING',
    FINISHED = 'FINISHED',
    FAILED = 'FAILED',
    RETRYING = 'RETRYING',
}