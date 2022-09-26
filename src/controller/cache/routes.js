const router = require("express").Router();
const cache = require("./");

// Tasks
router.get("/:key", cache.getCachedValueByKey);
router.get("/error", cache.buggyRoute);

// Export the router
exports.cachedRoutes = router;

