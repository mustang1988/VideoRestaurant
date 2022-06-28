export class FileNotFoundError extends Error {
    #file: string;

    constructor(file: string) {
        super(`File not found error, file: ${file}`);
        this.#file = file;
    }

    getNotFoundFile(): string {
        return this.#file;
    }
}
