const router = require("express").Router();
const auth = require("./");

// Tasks
router.get("/login", auth.userLogin);

// Export the router
exports.authRoutes = router
