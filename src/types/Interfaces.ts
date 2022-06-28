// interface defines
import { ChildProcess } from 'child_process';
import {
    EResult,
    EMessageType,
    ENodeStatus,
    // EQueueMessageType,
    // ETaskResult,
    // ETaskStatus,
} from './Enums';

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
    result: EResult;
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
    /**
     * Execute current job
     */
    run(): Promise<ChildProcess>;
    /**
     * Get current job's progress percent
     */
    // getProgress(): number;

    /**
     * Get job process instance
     */
    // getProcess(): ChildProcess | null;

    /**
     * Get job process's stdout string
     */
    // getStdout(): string;
}

export interface IMedia {
    /**
     * Get media streams infomation
     */
    getStreams(): IMediaStreams | null;
    /**
     * Get media format information
     */
    getFormat(): IMediaFormat | null;
    /**
     * Get media metadata which is given by ffprobe
     */
    getMetadata(): unknown;

    isHDR(): boolean;
}

export interface IMediaStreams {
    /**
     * Get media video stream infomation
     */
    getVideoStream(): IMediaVideoStream | null;
    /**
     * Get media audio stream information
     */
    getAudioStream(): IMediaAudioStream | null;

    hasVideoStream(): boolean;

    hasAudioStream(): boolean;
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
    getIndex(): IProperty<number | null>;
    getCodecName(): IProperty<string | null>;
    getCodecLongName(): IProperty<string | null>;
    getProfile(): IProperty<string | null>;
    getCodecTagString(): IProperty<string | null>;
    getCodecTag(): IProperty<string | null>;
    getRFrameRate(): IProperty<IRatio | null>;
    getAvgFrameRate(): IProperty<IRatio | null>;
    getTimeBase(): IProperty<IRatio | null>;
    getStartPTS(): IProperty<number | null>;
    getStartTime(): IProperty<number | null>;
    getDurationTS(): IProperty<number | null>;
    getDuration(): IProperty<number | null>;
    getBitRate(): IProperty<number | null>;
    getNbFrames(): IProperty<number | null>;
    getDisposition(): IProperty<Map<string, string> | null>;
    getTags(): IProperty<Map<string, string> | null>;
}

export interface IMediaVideoStream extends IMediaStream {
    getWidth(): IProperty<number | null>;
    getHeight(): IProperty<number | null>;
    getCodedWidth(): IProperty<number | null>;
    getCodedHeight(): IProperty<number | null>;
    getClosedCaptions(): IProperty<string | null>;
    getHasBFrames(): IProperty<number | null>;
    getSampleAspectRatio(): IProperty<IRatio | null>;
    getDisplayAspectRatio(): IProperty<IRatio | null>;
    getPixFmt(): IProperty<string | null>;
    getLevel(): IProperty<number | null>;
    getColorRange(): IProperty<string | null>;
    getColorSpace(): IProperty<string | null>;
    getColorTransfer(): IProperty<string | null>;
    getColorPrimaries(): IProperty<string | null>;
    getChromaLocation(): IProperty<string | null>;
    getRefs(): IProperty<number | null>;
}

export interface IMediaAudioStream extends IMediaStream {
    getSampleFmt(): IProperty<string | null>;
    getSampleRate(): IProperty<number | null>;
    getChannels(): IProperty<number | null>;
    getChannelLayout(): IProperty<string | null>;
    getBitsPerSample(): IProperty<number | null>;
}

export interface IRatio {
    /**
     * Transform a ratio to number
     * @param fixed {number}
     */
    toNumber(fixed?: number): number;
    /**
     * Tranform a ratio to string foramt
     * @param seperator {string} ratio seperator in result
     */
    toString(seperator?: string): string;
}

export interface IFFmpeg {
    hide_banner(flag: boolean): IFFmpeg;
    v(log_level: string): IFFmpeg;
    i(input: string, file?: boolean): IFFmpeg;
    threads(threads: number): IFFmpeg;
    sn(flag: boolean): IFFmpeg;
    dn(flag: boolean): IFFmpeg;
    y(flag: boolean): IFFmpeg;
    g(gop: number): IFFmpeg;
    r(fps: string): IFFmpeg;
    pix_fmt(pix_fmt: string): IFFmpeg;
    c_v(codec: string): IFFmpeg;
    b_v(bit_rate: number): IFFmpeg;
    preset(preset: string): IFFmpeg;
    v_profile(profile: string): IFFmpeg;
    speed(speed: number): IFFmpeg;
    row_mt(flag: boolean): IFFmpeg;
    frame_parallel(flag: boolean): IFFmpeg;
    tile_columns(tile_columns: number): IFFmpeg;
    quality(quality: string): IFFmpeg;
    deadline(deadline: string): IFFmpeg;
    cpu_used(cpu_used: number): IFFmpeg;
    level(level: number): IFFmpeg;
    c_a(codec: string): IFFmpeg;
    b_a(bit_rate: number): IFFmpeg;
    ar(sample_rate: number): IFFmpeg;
    safe(flag: boolean): IFFmpeg;
    f(format: string, output?: boolean): IFFmpeg;
    output(output: string): IFFmpeg;
    getId(): string;
    getBin(): string;
    getOptions(): ICommandOptions;
    getInputs(): IInput[];
    check(): boolean;
    // execute(): Promise<IProcessable>;
    execute(immediately?: boolean): Promise<IProcessable>;
}

export interface IInput extends IOption<string> {
    isFile(): boolean;
}

export interface IFFprobe {
    v(log_level: string): IFFprobe;
    of(format: string): IFFprobe;
    i(input: string): IFFprobe;
    showStreams(flag: boolean): IFFprobe;
    showForamt(flag: boolean): IFFprobe;
    getBin(): string;
    getOptions(): ICommandOptions;
    check(): CheckResult;
    execute(): Promise<IMedia>;
    executeSync(): IMedia;
}

export interface CheckResult {
    result: boolean;
    errors?: Error[];
}

export interface IOption<T> {
    getName(): string;
    getValue(): T;
    getConflicts(): string[];
    getPriority(): number;
    toString(): string;
    toArray(): string[];
    isUnique(): boolean;
}

export interface IProperty<T> {
    getValue(): T;
}

export interface ICommandOptions {
    setOption(option: IOption<unknown>): void;
    get(name: string): IOption<unknown> | undefined;
    toArray(): string[];
    toString(): string;
    getInputs(): IInput[];
    // getVideoOptions(): IOption<unknown>[];
    // getAudioOptions(): IOption<unknown>[];
    getOutputFormat(): IOption<string>;
    getOutput(): IOption<string>;
}

export interface IWaiterConfig {
    service: { port: number };
    queue: { task: IQueueConfig; callback: IQueueConfig };
    database: IRedisConfig;
}

export interface IChefConfig {
    service: { port: number };
    queue: { task: IQueueConfig; callback: IQueueConfig };
    database: IRedisConfig;
    hw_acc: boolean;
}

export interface IAssistantConfig {
    chef: { host: string; port: number };
    database: IRedisConfig;
    hw_acc: boolean;
}

export interface IRedisConfig {
    host: string;
    port: number;
    pwd?: string;
    username?: string;
}

export interface IQueueConfig extends IRedisConfig {
    name: string;
}
