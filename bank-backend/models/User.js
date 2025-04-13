const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },

    lastname: {
        type: String
    },

    phone: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin : {
    type : Boolean,
    required : true,
    default : false
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String
    },
    pinHash : {
    type : String
    },
    isPinSet : {
     type : Boolean,
    required : true,
    default : false
    },
    createdAt: {
        type: Date, default: Date.now()
    }
},{ timestamps: true })

const User = mongoose.model("User", UserSchema);

module.exports = User;