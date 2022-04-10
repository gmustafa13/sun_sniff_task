const {userServices} = require('../services')

const create = async(userInfo)=>{
    return await userServices.create(userInfo)
}


module.exports ={
    create
}