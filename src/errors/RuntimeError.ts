export class RuntimeError extends Error {
    #bin: string;
    #options: string[];
    #stdout?: string;
    #stderr?: string;

    constructor(
        bin: string,
        options: string[],
        stdout?: string,
        stderr?: string
    ) {
        super();
        this.#bin = bin;
        this.#options = options;
        this.#stderr = stderr;
        this.#stdout = stdout;
    }
}
