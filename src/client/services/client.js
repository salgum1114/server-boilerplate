import axios from 'axios';
import qs from 'qs';
import firebase from 'firebase/app';

const instance = axios.create({
    timeout: 30000,
    withCredentials: true,
});

const requestInterceptor = async (method, url, data, headers, responseType) => {
    try {
        let defaultHeaders = {};
        let token;
        if (firebase.auth().currentUser) {
            token = await firebase.auth().currentUser.getIdToken();
        }
        if (token) {
            defaultHeaders = {
                Authorization: `Bearer ${token}`,
            };
        }
        const options = {
            method,
            url,
            // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            responseType: responseType || 'json',
            headers: defaultHeaders,
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
        };
        if (data && (method === 'GET' || method === 'DELETE')) {
            options.params = data;
        } else if (data) {
            options.data = data;
            options.headers = Object.assign(options.headers, {
                'Content-Type': 'application/json',
            });
        }
        if (headers) {
            options.headers = Object.assign(options.headers, headers);
        }
        return new Promise((resolve, reject) => {
            instance.request(options)
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    if (error.response) {
                        error.message = error.response.data ? error.response.data.message : `${error.response.status} ${error.response.statusText}`;
                    } else {
                        error.message = error.message || `${error.status} ${error.statusText}`;
                    }
                    reject(error);
                });
        });
    } catch (error) {
        console.error(error);
    }
};

const client = {
    get(url, data, headers, responseType) {
        return requestInterceptor('GET', url, data, headers, responseType);
    },
    post(url, data, headers, responseType) {
        return requestInterceptor('POST', url, data, headers, responseType);
    },
    delete(url, data, headers, responseType) {
        return requestInterceptor('DELETE', url, data, headers, responseType);
    },
    put(url, data, headers, responseType) {
        return requestInterceptor('PUT', url, data, headers, responseType);
    },
    patch(url, data, headers, responseType) {
        return requestInterceptor('patch', url, data, headers, responseType);
    },
    all(requests) {
        return Promise.all(requests);
    },
};

export default client;