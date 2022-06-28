export class MissingRequiredOptionError extends Error {
    #missing_option_name: string;

    constructor(missing_option_name: string) {
        super(`Missing required option: ${missing_option_name}`);
        this.#missing_option_name = missing_option_name;
    }
}
