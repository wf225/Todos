import fetch from 'isomorphic-fetch'

let api_host = process.env.SERVICE_URL;

export class Request {

    static _fetch(url, method, data) {
        let options = {
            method: method,
            headers: Request._headers
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        return fetch(api_host + url, options);
    }

    static get(url, data) {
        return Request._fetch(url, 'GET', data);
    }

    static delete(url) {
        return Request._fetch(url, 'DELETE');
    }

    static post(url, data) {
        return Request._fetch(url, 'POST', data);
    }

    static put(url, data) {
        return Request._fetch(url, 'PUT', data);
    }

    static patch(url, data) {
        return Request._fetch(url, 'PATCH', data);
    }

}

Request._headers = {
    'Accept': '*',
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
};

export default Request;