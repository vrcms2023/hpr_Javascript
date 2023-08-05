const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    isActive : {
        type : Boolean,
        required:true
    },
    isSuperAdmin : {
        type:Boolean,
        required: true
    }
  
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User;