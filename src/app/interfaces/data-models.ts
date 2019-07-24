export interface Person {
    id: string;
    name: string;
    avatarUrl?: string;
    parentId?: string;
}
export interface Family {
    people: Person[];
    grandFather: Person[];
    nullRoot: Person;
    name: string;
    id: string;
    originCity: string;
    country: string;
}
export interface Meta {
    fromCache: boolean;
    hasPendingWrites: boolean;
}
interface PersonExt {
    sons?: Extended<Person>[];
    parent?: Extended<Person>;
    isExpanded?: boolean;
    addNew?: boolean;
}
export type ExtType = PersonExt;

export interface Extended<T> {
    id: string;
    data: T;
    ext?: ExtType;
    meta?: Meta;
}
export interface TreeNode {
    parentId: string;
    name: string;
  }
export class ExtMap<T> {
    map: Map<string, T>;
    toArray() {
        return Array.from(this.map.values());
    }
    get(key) {
        return this.map.get(key);
    }
    set(key: string, value: T) {
        return this.map.set(key, value);
    }
    forEach(
        callbackfn: (value: T, key: string, map: Map<string, T>) => void,
        thisArg?: any
    ): void {
        return this.map.forEach(callbackfn);
    }
    constructor(vals?) {
        this.map = new Map<string, T>(vals);
    }
}
