import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

type HttpStatus =
    400 | 401 | 403 | 404 | 405 | 406 | 407 | 408 |
    409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 |
    417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 |
    428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 |
    504 | 505 | 506 | 507 | 508 | 510 | 511;

type errorData = {[key: string]: unknown};

export const notFoundHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    await reply.code(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Endpoint not found',
    });
};

export const errorisErrnoException = (error: unknown): error is NodeJS.ErrnoException => {
    return error instanceof Error && 'code' in error;
};

export const httpErrorHandler = async (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (error.code === 'FST_ERR_CTP_INVALID_MEDIA_TYPE') {
        await reply.code(415).send({
            statusCode: 415,
            error: 'Unsupported Media Type',
            message: 'Unsupported media type',
        });
        return;
    }

    if (error.code === 'FST_ERR_CTP_EMPTY_JSON_BODY') {
        await reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Empty JSON body',
        });
        return;
    }

    if (error.code === 'FST_ERR_VALIDATION') {
        await reply.code(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Validation error',
            data: error.validation,
        });
        return;
    }

    if (error instanceof HttpError) {
        if (error.status >= 500) {
            console.error('Interal error - ', error);
        }

        await reply.code(error.status).send({
            statusCode: error.status,
            error: error.name,
            message: error.message,
            data: error.data ? error.data : undefined,
        });
        return;
    }

    console.log('Interal non-http error - ', error);
    await reply.code(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'An internal server error occurred',
    });
};

export class HttpError extends Error {
    public readonly status: HttpStatus;
    public readonly data: errorData | null;
    public readonly name: string;

    constructor(name = 'HttpError', message: string, status: HttpStatus, data: errorData | null = null) {
        super(message);
        this.name = name;
        this.status = status;
        this.data = Object.keys(data ?? {}).length ? data : null;
    }
}

export class BadRequestError extends HttpError {
    constructor(message = 'Bad Request', data: errorData | null = null) {
        super('Bad Request', message, 400, data);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = 'Unauthorized', data: errorData | null = null) {
        super('Unauthorized', message, 401, data);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message = 'Forbidden', data: errorData | null = null) {
        super('Forbidden', message, 403, data);
    }
}

export class NotFoundError extends HttpError {
    constructor(message = 'Not Found', data: errorData | null = null) {
        super('Not Found', message, 404, data);
    }
}

export class MethodNotAllowedError extends HttpError {
    constructor(message = 'Method Not Allowed', data: errorData | null = null) {
        super('Method Not Allowed', message, 405, data);
    }
}

export class NotAcceptableError extends HttpError {
    constructor(message = 'Not Acceptable', data: errorData | null = null) {
        super('Not Acceptable', message, 406, data);
    }
}

export class ProxyAuthenticationRequiredError extends HttpError {
    constructor(message = 'Proxy Authentication Required', data: errorData | null = null) {
        super('Proxy Authentication Required', message, 407, data);
    }
}

export class RequestTimeoutError extends HttpError {
    constructor(message = 'Request Timeout', data: errorData | null = null) {
        super('Request Timeout', message, 408, data);
    }
}

export class ConflictError extends HttpError {
    constructor(message = 'Conflict', data: errorData | null = null) {
        super('Conflict', message, 409, data);
    }
}

export class GoneError extends HttpError {
    constructor(message = 'Gone', data: errorData | null = null) {
        super('Gone', message, 410, data);
    }
}

export class LengthRequiredError extends HttpError {
    constructor(message = 'Length Required', data: errorData | null = null) {
        super('Length Required', message, 411, data);
    }
}

export class PreconditionFailedError extends HttpError {
    constructor(message = 'Precondition Failed', data: errorData | null = null) {
        super('Precondition Failed', message, 412, data);
    }
}

export class PayloadTooLargeError extends HttpError {
    constructor(message = 'Payload Too Large', data: errorData | null = null) {
        super('Payload Too Large', message, 413, data);
    }
}

export class URITooLongError extends HttpError {
    constructor(message = 'URI Too Long', data: errorData | null = null) {
        super('URI Too Long', message, 414, data);
    }
}

export class UnsupportedMediaTypeError extends HttpError {
    constructor(message = 'Unsupported Media Type', data: errorData | null = null) {
        super('Unsupported Media Type', message, 415, data);
    }
}

export class RangeNotSatisfiableError extends HttpError {
    constructor(message = 'Range Not Satisfiable', data: errorData | null = null) {
        super('Range Not Satisfiable', message, 416, data);
    }
}

export class ExpectationFailedError extends HttpError {
    constructor(message = 'Expectation Failed', data: errorData | null = null) {
        super('Expectation Failed', message, 417, data);
    }
}

export class TeapotError extends HttpError {
    constructor(message = 'I am a teapot', data: errorData | null = null) {
        super('I am a teapot', message, 418, data);
    }
}

export class MisdirectedRequestError extends HttpError {
    constructor(message = 'Misdirected Request', data: errorData | null = null) {
        super('Misdirected Request', message, 421, data);
    }
}

export class UnprocessableEntityError extends HttpError {
    constructor(message = 'Unprocessable Entity', data: errorData | null = null) {
        super('Unprocessable Entity', message, 422, data);
    }
}

export class LockedError extends HttpError {
    constructor(message = 'Locked', data: errorData | null = null) {
        super('Locked', message, 423, data);
    }
}

export class FailedDependencyError extends HttpError {
    constructor(message = 'Failed Dependency', data: errorData | null = null) {
        super('Failed Dependency', message, 424, data);
    }
}

export class TooEarlyError extends HttpError {
    constructor(message = 'Too Early', data: errorData | null = null) {
        super('Too Early', message, 425, data);
    }
}

export class UpgradeRequiredError extends HttpError {
    constructor(message = 'Upgrade Required', data: errorData | null = null) {
        super('Upgrade Required', message, 426, data);
    }
}

export class PreconditionRequiredError extends HttpError {
    constructor(message = 'Precondition Required', data: errorData | null = null) {
        super('Precondition Required', message, 428, data);
    }
}

export class TooManyRequestsError extends HttpError {
    constructor(message = 'Too Many Requests', data: errorData | null = null) {
        super('Too Many Requests', message, 429, data);
    }
}

export class RequestHeaderFieldsTooLargeError extends HttpError {
    constructor(message = 'Request Header Fields Too Large', data: errorData | null = null) {
        super('Request Header Fields Too Large', message, 431, data);
    }
}

export class UnavailableForLegalReasonsError extends HttpError {
    constructor(message = 'Unavailable For Legal Reasons', data: errorData | null = null) {
        super('Unavailable For Legal Reasons', message, 451, data);
    }
}

export class InternalServerError extends HttpError {
    constructor(message = 'Internal Server Error', data: errorData | null = null) {
        super('Internal Server Error', message, 500, data);
    }
}

export class NotImplementedError extends HttpError {
    constructor(message = 'Not Implemented', data: errorData | null = null) {
        super('Not Implemented', message, 501, data);
    }
}

export class BadGatewayError extends HttpError {
    constructor(message = 'Bad Gateway', data: errorData | null = null) {
        super('Bad Gateway', message, 502, data);
    }
}

export class ServiceUnavailableError extends HttpError {
    constructor(message = 'Service Unavailable', data: errorData | null = null) {
        super('Service Unavailable', message, 503, data);
    }
}

export class GatewayTimeoutError extends HttpError {
    constructor(message = 'Gateway Timeout', data: errorData | null = null) {
        super('Gateway Timeout', message, 504, data);
    }
}

export class HTTPVersionNotSupportedError extends HttpError {
    constructor(message = 'HTTP Version Not Supported', data: errorData | null = null) {
        super('HTTP Version Not Supported', message, 505, data);
    }
}
