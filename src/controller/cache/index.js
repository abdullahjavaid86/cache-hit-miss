const {generateRandomString} = require("../../helpers/functions");
exports.getCachedValueByKey = (req, res) => {
    const {key} = req.params
    try {
        const getFromCache = setOrGetCache(key)

        // cache miss
        if (!getFromCache.success) {
            logger.info("Cache miss")
        } else {
            logger.info("Cache hit")
        }
        res.status(200).send(getFromCache.data)
    } catch (e) {
        console.error("cache", e)
        if (e.name === 'ECACHEFULL') nodeCache.flushAll();
        res.status(500).send(setOrGetCache(key, `${e.message} and cache has been overwritten`).data)
    }
};

exports.buggyRoute = (req, res, next) => {
    // Simulate a custom error
    next(newHttpError(400, "bad request"));
};


const setOrGetCache = (key, message) => {
    const getFromCache = nodeCache.get(key);
    if (!getFromCache) {
        logger.info("Cache miss")
        const random = generateRandomString(10)
        nodeCache.set(key, random, process.env.STD_TTL)
        return ({
            success: false,
            data: errorResponse(message ?? "Cache miss", 400, random)
        })
    }
    logger.info("Cache hit");
    return ({
        success: true,
        data: successResponse(getFromCache)
    })
}
