const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String, require },
    email: { type: String, require, unique: true },
    password: { type: String, require },
    address:{ type: String, require },
    isAdmin: { type: Boolean, default: false },
    pic: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
}, {
    timestamps: true,
})

module.exports = mongoose.model('users', userSchema)


/**const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String, require },
    email: { type: String, require, unique: true },
    password: { type: String, require },
    address:{ type: String, require },
    isAdmin: { type: Boolean, default: false },
}, {
    timestamps: true,
})

module.exports = mongoose.model('users', userSchema) */