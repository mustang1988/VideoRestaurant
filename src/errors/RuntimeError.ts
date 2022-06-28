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
        super(
            `Runtime error, bin: ${bin}, options: ${options}, stderr: ${
                stderr || ''
            }, stdout: ${stdout || ''}`
        );
        this.#bin = bin;
        this.#options = options;
        this.#stderr = stderr || '';
        this.#stdout = stdout || '';
    }

    getBin(): string {
        return this.#bin;
    }

    getOptions(): string[] {
        return this.#options;
    }

    getStdOut(): string {
        return this.#stdout || '';
    }

    getStdErr(): string {
        return this.#stderr || '';
    }
}
