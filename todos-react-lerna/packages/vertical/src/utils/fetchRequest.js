import fetch from 'isomorphic-fetch'

const RESTful_Host = "https://aza1oyphg6.execute-api.us-east-1.amazonaws.com/staging1";

export class Request {

    static _fetch(url, method, data) {
        let options = {
            method: method,
            headers: Request._headers
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        return fetch(RESTful_Host + url, options);
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
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export default Request;