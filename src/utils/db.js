const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/sun_sniff',(err,connet)=>{
if(err){
    console.log('error while connecting db');
}
console.log('mongodb connected');
})