/**
 * Created by liyang9 on 2016/10/12.
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    label:{
        type: String
    },
    price:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    comments: [commentSchema]
},{
    timestamp:true
});

var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;