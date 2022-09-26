"use strict";

const router = require("express").Router();
const middleware = require("./middlewares");
const errors = require("./errors/error");
const healthRouter = require("./health/router");
const {authRoutes} = require("./controller/auth/router");
const {cachedRoutes} = require("./controller/cache/routes");
const auth = require("./middlewares/auth")

// Wire up middleware
router.use(middleware.doSomethingInteresting);

// Wire up routers
router.use("/health", healthRouter);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/cache", auth, cachedRoutes);

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

// Export the router
module.exports = router;
