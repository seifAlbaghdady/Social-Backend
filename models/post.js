const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:false
    },
    user:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Post', postSchema);