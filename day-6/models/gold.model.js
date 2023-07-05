const mongoose = require('mongoose');

const goldSchema = new mongoose.Schema({
    price:{
        type:Number,
        min:1,
        required:true,
    }
});


const goldModel = mongoose.model('gold', goldSchema);


module.exports={
    goldModel
}