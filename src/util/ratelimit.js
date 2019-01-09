const map = new Map();

/**
 * Check/update a rate limit
 * @param {*} key the unique key to rate limit
 * @return {boolean} true if the limit has been reached
 */
export function limit(key) {
    let last = map.get(key);
    let now = performance.now();
    map.set(key, now);

    if (last == null || now - last > 10000) {
        return false;
    }

    return true;
}
