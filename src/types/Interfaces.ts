// interface defines
import { EJobResult, EMessageType, ENodeStatus } from './Enums';

// super interface of WebSocket message between Chef and Assistant
export interface IWebSocketMessage {
    type: EMessageType;
}

// message interface for Assistant register event
export interface INodeRegisterMessage extends IWebSocketMessage {
    type: EMessageType.A_NODE_REGISTER;
    ip: string;
}

// message interface for Chef to response Assistant register event
export interface INodeRegisterResponseMessage extends IWebSocketMessage {
    type: EMessageType.C_NODE_REGISTER_RESPONSE;
    id: string;
}

// message interface for Chef to read Assistant status
export interface INodeStatusRequestMessage extends IWebSocketMessage {
    type: EMessageType.C_NODE_STATUS_REQUEST;
}

// message interface for Assistant to response Chef's readl status request
export interface INodeStatusResponseMessage extends IWebSocketMessage {
    type: EMessageType.A_NODE_STATUS_RESPONSE;
    status: ENodeStatus;
}

// message interface for Chef to distribute job to Assistant
export interface IJobDistributeMessage extends IWebSocketMessage {
    type: EMessageType.C_JOB_DISTRIBUTE;
    id: string;
    input: string;
    args: string[];
}

// message interface for Assistant to response Chef's job distribute event
export interface IJobReceiveMessage extends IWebSocketMessage {
    type: EMessageType.A_JOB_RECEIVE;
    id: string;
}

// message interface for Assistant when job is resolved
export interface IJobResolveMessage extends IWebSocketMessage {
    type: EMessageType.A_JOB_RESOLVE;
    id: string;
    output: string;
    log: string;
    result: EJobResult;
}

// message interface for Chef to get job process
export interface IJobProcessRequestMessage extends IWebSocketMessage {
    type: EMessageType.C_JOB_PROCESS_REQUEST;
    id: string;
}

export interface IJobProcessResponseMessage extends IWebSocketMessage {
    type: EMessageType.A_JOB_PROCESS_RESPONSE;
    id: string;
    process: number;
}

export interface IProcessable {
    getProcess(): number;
}

export interface IMedia {
    getStreams(): IMediaStreams | null;
    getFormat(): IMediaFormat | null;
}

export interface IMediaStreams {
    getVideoStream(): IMediaVideoStream | null;
    getAudioStream(): IMediaAudioStream | null;
}

export interface IMediaFormat {
    getFilename(): IProperty<string | null>;
    getNbStreams(): IProperty<number | null>;
    getNbPrograms(): IProperty<number | null>;
    getFormatName(): IProperty<string | null>;
    getFormatLongName(): IProperty<string | null>;
    getStartTime(): IProperty<number | null>;
    getDuration(): IProperty<number | null>;
    getSize(): IProperty<number | null>;
    getBitRate(): IProperty<number | null>;
    getProbScore(): IProperty<number | null>;
    getTags(): IProperty<Map<string, string> | null>;
}

export interface IMediaStream {
    getDuration(): number;
}

export interface IMediaVideoStream extends IMediaStream {
    // TODO
    getWidth(): number;
}

export interface IMediaAudioStream extends IMediaStream {
    // TODO
    getSampleRate(): number;
}

export interface IRatio {
    toNumber(fixed: number): number;
    toString(): string;
}

export interface IFFmpeg {
    // TODO
    execute(): Promise<IProcessable>;
    executeSync(): IProcessable;
}

export interface IFFprobe {
    // TODO
    execute(): Promise<IMedia>;
    executeSync(): IMedia;
}

export interface IOption<T> {
    getName(): string;
    getValue(): T;
    getConflicts(): string[];
    getPriority(): number;
    toString(): string;
}

export interface IProperty<T> {
    getValue(): T;
}
