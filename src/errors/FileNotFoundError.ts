export class FileNotFoundError extends Error {
    #file: string;

    constructor(file: string) {
        super(`File not found: ${file}`);
        this.#file = file;
    }
}
