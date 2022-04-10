const mongoose = require('mongoose')
const dbConnect = async()=>{
    try {    
        let connected =  await mongoose.connect(process.env.MONGO_URL)
        if(connected){
            console.log('mongodb connected')
            return true
        }
    } catch (error) {
        console.log(`error while connecting mongodb`);
        return false
    }
}

module.exports = {dbConnect}