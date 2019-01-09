let token;
let baseUrl;

/**
 * Set the auth-token
 * @param {string} t the token
 */
export function setToken(t) {
    token = t;
}

/**
 * Perform a GET http request
 * @param {string} url the destination url
 * @return {Promise}
 */
export function get(url) {
    return request('GET', url);
}

/**
 * Perform a PUT http request
 * @param {string} url the destination url
 * @param {*} data the post contents
 * @return {Promise}
 */
export function put(url, data) {
    return request('PUT', url, data);
}

/**
 * Perform a POST http request
 * @param {string} url the destination url
 * @param {*} data the post contents
 * @return {Promise}
 */
export function post(url, data) {
    return request('POST', url, data);
}

/**
 * Perform a PATCH http request
 * @param {string} url the destination url
 * @param {*} data the post contents
 * @return {Promise}
 */
export function patch(url, data) {
    return request('PATCH', url, data);
}

/**
 * Perform an http request
 * @param {string} method the http method
 * @param {string} url the destination url
 * @param {*} data the post contents
 * @return {Promise}
 */
export function request(method, url, data) {
    if (typeof data == 'object') {
        data = JSON.stringify(data);
    }

    if (baseUrl) {
        url = baseUrl + url;
    }

    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.addEventListener('load', () => {
            let res;
            let contentType = req.getResponseHeader('Content-Type');
            if (contentType && contentType.indexOf('application/json') != -1) {
                res = JSON.parse(req.responseText);
            }
            if (req.status == 200) {
                resolve(res);
            } else {
                reject({ status: req.status, content: res });
            }
        });

        req.addEventListener('error', (e) => {
            reject(e);
        });

        req.open(method, url, true);

        if (token) {
            req.setRequestHeader('Auth-Token', token);
        }

        if (data) {
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(data);
        } else {
            req.send();
        }
    });
}

let map = [
    /(testing|api)\.highqualityconnections\.com/, 'https://api.smallworldapp.org:25566',
    /(testing|api)\.smallworldapp\.org/, 'https://api.smallworldapp.org:25566',
    /highqualityconnections\.com/, 'https://api.smallworldapp.org',
    /smallworldapp\.org/, 'https://api.smallworldapp.org',
    /./, 'http://localhost:8081',
];
for (let i = 0; i < map.length; i += 2) {
    if (map[i].test(window.location.hostname)) {
        baseUrl = map[i + 1];
        break;
    }
}
