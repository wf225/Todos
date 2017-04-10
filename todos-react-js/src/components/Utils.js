"use strict";

export class Utils {

    static uuid() {
        let i, random;
        let uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                .toString(16);
        }

        return uuid;
    }

    static pluralize(count, word) {
        return count === 1 ? word : word + 's';
    }

    static store(key, data) {
        if (data) {
            return localStorage.setItem(key, JSON.stringify(data));
        }

        let store = localStorage.getItem(key);
        return (store && JSON.parse(store)) || [];
    }

    static extend() {
        let newObj = {};
        for (let i = 0; i < arguments.length; i++) {
            let obj = arguments[i];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    }

}
