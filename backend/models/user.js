const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId : {
        type : String,
        required: true,
    },
    email : {
      type : String,
      required: true,
    },
    isAgent : {
        type : Boolean,
        default: false
    }
})


module.exports = mongoose.model('User',userSchema);