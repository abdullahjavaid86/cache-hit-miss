const {Schema, model} = require("mongoose");

const CacheSchema = new Schema(
    {
        type: {type: String, required: false}
    },
    {timestamps: true}
);

const Cache = model("cache", CacheSchema, "cache");

module.exports = Cache;
