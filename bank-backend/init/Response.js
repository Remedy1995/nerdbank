class Response {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    errorObject() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
        };
    }

    successObject() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
        };
    }
}

module.exports = Response;
