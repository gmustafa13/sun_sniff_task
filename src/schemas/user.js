const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },
    address: {
        type: String
    },
    mobileNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {

    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    }
});

userSchema.virtual('fullName').get(function () {
    if (this.firstName && this.lastName) {
      return this.firstName+" "+this.lastName;
    }
  });


module.exports = mongoose.model("user", userSchema);