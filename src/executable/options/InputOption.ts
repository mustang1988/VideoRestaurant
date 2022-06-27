import { IInput } from '../../types/Interfaces';
import { StringOption } from './StringOption';

export class InputOption extends StringOption implements IInput {
    #is_file: boolean;

    constructor(
        is_file: boolean,
        value: string,
        priority = 0,
        conflicts: string[] = [],
        unique = true
    ) {
        super('-i', value, priority, conflicts, unique);
        this.#is_file = is_file;
    }

    isFile(): boolean {
        return this.#is_file;
    }
}
