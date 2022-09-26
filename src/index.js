const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const {corsOptions} = require("./../config/app/generic.json");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./helpers/logger");

const routes = require("./routes");
const {successResponse, errorResponse} = require("./helpers/http_response");
const {newHttpError} = require("./errors/error");
const NodeCache = require("node-cache");

const setupApp = (app) => {
    // Rest API security
    app.use(helmet());

    // request methods
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(cookieParser());

    // cors and logs
    app.use(cors(corsOptions));
    app.use(morgan("combined", {stream: logger.stream}));

    app.use(routes);

    process.on('uncaughtException', (reason, promise) => {
        console.error(promise)
        logger.error(`Uncaught Exception at: ${JSON.stringify(promise)}, due to: ${reason}`)
    })

    process.on('unhandledRejection', (reason, promise) => {
        console.error(promise)
        logger.error(`Unhandled Rejection at: ${JSON.stringify(promise)}, due to: ${reason}`)
    })

    global.successResponse = successResponse
    global.errorResponse = errorResponse
    global.newHttpError = newHttpError
    global.logger = logger
    global.nodeCache = new NodeCache({
        stdTTL: process.env.STD_TTL || 60,
        checkperiod: 120,
        deleteOnExpire: true,
        maxKeys: +(process.env.CACHE_MAX_KEYS ?? 10)
    });

};

module.exports = setupApp;
