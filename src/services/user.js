const userModel = require('../schemas/user')
const create = async(userInfo)=>{
   try {
    const userData = new userModel(userInfo);
    return userData.save();
   } catch (error) {
       return error
   }
}
const getOne = async(filter)=>{
    try {
      return await  userModel.findOne(filter)
    } catch (error) {
       return error 
    }
}

module.exports ={
    create,
    getOne
}