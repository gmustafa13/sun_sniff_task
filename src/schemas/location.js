const mongoose = require("mongoose");
const schema = mongoose.Schema;

const locationSchema = new schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        }
        // type: schema.Types.Mixed
    },
    id: String,
    name: String,
    ascii: String,
    alt_name: String,
    feat_class: String,
    feat_code: String,
    country: String,
    cc2: String,
    admin1: String,
    admin2: String,
    admin3: String,
    admin4: String,
    population: Number,
    elevation: String,
    dem: String,
    tz: String,
    modified_at: Date
})
locationSchema.index({ "location": "2dsphere" })

module.exports = mongoose.model("location", locationSchema);