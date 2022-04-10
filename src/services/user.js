const userModel = require('../schemas/user')
const create = async(userInfo)=>{
   try {
    const userData = new userModel(userInfo);
    return userData.save();
   } catch (error) {
       return error
   }
}


module.exports ={
    create
}