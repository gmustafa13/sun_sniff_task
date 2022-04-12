const { userServices } = require('../services');
const jwt = require('jsonwebtoken')

const create = async (userInfo) => {
    let pass = userInfo.pass
    userInfo.password = await jwt.sign({ pass })
    return await userServices.create(userInfo)
}

const login = async (userInfo, userAgent) => {
    try {
        /**
         * incapsulating user agent as well so that same token cant use for other browser
         */
        const { email } = userInfo
        const pass = userInfo.password
        const password = await jwt.sign({ pass })
        let data = await userServices.getOne({ email, password });
        return await jwt.sign({ email: data.email, userAgent }, process.env.JWT_SECRET)
    } catch (error) {
        return error
    }
}


module.exports = {
    create,
    login
}