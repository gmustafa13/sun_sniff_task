const express = require('express')
const userRoute = express.Router();
const validateResult = require('../middleware/validationResult');
const { userValidation } = require('../middleware/user')

const { userController } = require('../controllers')
const create = async (req, res, next) => {
    const userInfo = req.body;
    userController.create(userInfo).then((result) => {
        _handleResponse(res, 201, result, 'success')
    }).catch((e) => {
        _handleResponse(res, 400, e.message, 'error')
    })

}

userRoute.post('/', userValidation(), validateResult, create)

module.exports = {
    userRoute
}