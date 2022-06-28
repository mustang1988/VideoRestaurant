export class MissingRequiredOptionError extends Error {
    #missing_option_name: string;

    constructor(missing_option_name: string) {
        super(
            `Missing required option error, option: ${missing_option_name} is required`
        );
        this.#missing_option_name = missing_option_name;
    }

    getMissionOption() {
        return this.#missing_option_name;
    }
}
