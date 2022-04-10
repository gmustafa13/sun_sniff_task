const express = require('express')
const location = express.Router();
const { locationController } = require('../controllers')
const create = async (req, res, next) => {
    locationController.create().then((result) => {
        _handleResponse(res, 201, result, 'success')
    }).catch((e) => {
        _handleResponse(res, 400, e.message, 'error')
    })
}
const getData = async (req, res, next) => {
    // console.log("in get data",req.query);
    locationController.getData(req.query).then((result) => {
        _handleResponse(res, 200, result, 'success')
    }).catch((e) => {
        _handleResponse(res, 400, e.message, 'error')
    })
}
const getDataWithPagination = async (req, res, next) => {
    locationController.getDataWithPagination(req.query).then((result) => {
        _handleResponse(res, 200, result, 'success')
    }).catch((e) => {
        _handleResponse(res, 400, e.message, 'error')
    })
}



location.get('/create', create)
location.get('/', getData)
location.get('/with-pagination',getDataWithPagination)

module.exports = {
    location
}