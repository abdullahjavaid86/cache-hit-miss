exports.successResponse = (data) => ({success: true, code: 200, data});

/**
 * @param {string | Record<string | number, any>} error
 * @param {?number} errorCode
 * @param {?null|string|any[]|Object} data
 * */
exports.errorResponse = (error, errorCode = 500, data = null) => ({
    success: false,
    code: errorCode,
    error,
    data
});
