
const errorHandler = (err, req, res, next) => {

    let errorMessage = {
        code: err.code || 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Internal Server Error',
        statusCode: err.status || 500
    }

    res.status(err.status || 500).json(errorMessage);
}

module.exports = errorHandler;