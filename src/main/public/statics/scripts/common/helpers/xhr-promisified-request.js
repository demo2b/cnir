/**
 * Common class to generate Promisified XHR Requests and allowing
 * builder design pattern construction.
 * @author Jonas Fournel
 */

export class XHRPromisifiedRequest {

    static HTTP_METHOD_GET = 'GET';
    static HTTP_METHOD_POST = 'POST';
    static HTTP_METHOD_PUT = 'PUT';

    /**
     * Creating a new instance of XHR request, and returning self object to allow Builder design pattern.
     * @param url Target URL XHR should send to.
     * @param method HTTP Methods
     */
    constructor(url, method = XHRPromisifiedRequest.HTTP_METHOD_GET) {
        this.xhr = new XMLHttpRequest();
        this.url = url;
        this.method = method;
        return this;
    }

    /**
     * Add to current XHR request HTTP headers.
     * Returning class itself to follow builder design pattern.
     * @param headers
     */
    setRequestHeaders(headers) {
        Object.entries(headers).forEach(([key, value]) => {
            this.xhr.setRequestHeader(key, value.toString());
        });
        return this;
    }

    /**
     * Executing XHR request, and returning Promise depending on XHR output.
     * @param body Optional request body to send, like POST body data.
     * @return {Promise<XHRPromisifiedResponse>}
     */
    executeRequest(body = null) {
        const _this = this;
        const start = Date.now();

        return new Promise((resolve, reject) => {
            this.xhr.onload = function () {
                console.debug(`Request executed with success in ${Date.now() - start} ms`);
                if (_this.xhr.status >= 200 && _this.xhr.status < 300) {
                    resolve(new XHRPromisifiedResponse(
                        _this.xhr.responseText,
                        _this.xhr.status,
                        _this.method,
                        _this.url));
                } else {
                    reject(new XHRPromisifiedResponse(
                        _this.xhr.responseText,
                        _this.xhr.status || 0,
                        _this.method,
                        _this.url));
                }
            };

            this.xhr.onerror = function (error) {
                console.error(`Request 'HTTP ${_this.method} - ${_this.url}' executed with error in ${Date.now() - start} ms`);
                reject(new XHRPromisifiedResponse(
                    `An error occurred while executing XHR Request ${_this.url} : ${error}`,
                    0,
                    _this.method,
                    _this.url));
            };

            this.xhr.open(_this.method, _this.url);
            this.xhr.send(body);
        });
    }
}

/**
 * Wrapper class for XHR Responses
 */
export default class XHRPromisifiedResponse {

    /**
     * @param responseText XHR Response text
     * @param httpStatus XHR HTTP Response Status
     * @param httpMethod Original HTTP Method
     * @param sourceURL Original Source URL;
     */
    constructor(responseText, httpStatus, httpMethod, sourceURL) {
        this.responseText = responseText;
        this.httpStatus = httpStatus;
        this.httpMethod = httpMethod;
        this.sourceURL = sourceURL;
    }
}

