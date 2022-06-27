// Enumlation definitions for the application.

export enum ENodeStatus {
    OFFLINE = 'offline',
    IDEL = 'idel',
    WORKING = 'working',
}

export enum EMessageType {
    // Message types emit by Chef
    C_NODE_REGISTER_RESPONSE = 'node_register_response',
    C_JOB_DISTRIBUTE = 'job_distribute',
    C_NODE_STATUS_REQUEST = 'node_status_request',
    C_JOB_PROCESS_REQUEST = 'job_process_request',
    // Message types emit by Assistant
    A_NODE_REGISTER = 'node_register',
    A_JOB_RECEIVE = 'job_receive',
    A_JOB_RESOLVE = 'job_resolve',
    A_NODE_STATUS_RESPONSE = 'node_status_response',
    A_JOB_PROCESS_RESPONSE = 'job_process_response',
}

export enum EJobResult {
    SUCCESS = 'success',
    FAILED = 'failed',
}

export enum ETaskResult {
    SUCCESS = 'success',
    FAILED = 'failed',
}

export enum ETaskStatus {
    QUEUING = 'queuing', // task in queue, waiting for Chef to consume
    ANALYZING = 'analyzing', // task has been pop from task queue by Chef, input file's metadata reading
    PREPARING = 'preparing', // task input file metadata has been analyzed by Chef, jobs are creating and distribiting to Assistant
    RUNNING = 'running', // task has been distribute to Assistant by Chef, and no result has been send to Chef
    COMPOSITING = 'compositing' // all job has been finished, Chef is going to concat output segments, and archive useless output files
    

}
