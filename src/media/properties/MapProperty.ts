import _ from 'lodash';
import { IProperty } from '../../types/Interfaces';

export class MapProperty implements IProperty<Map<string, string> | null> {
    #value: Map<string, string> | null;

    constructor(value: JSON) {
        if (_.isNull(value) || _.isEmpty(value)) {
            this.#value = null;
        } else {
            const map = new Map<string, string>();
            for (const key of Object.keys(value)) {
                map.set(key, _.get(value, key));
            }
            this.#value = map;
        }
    }

    getValue(): Map<string, string> | null {
        return this.#value;
    }
}
