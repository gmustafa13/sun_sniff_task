const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const userRoutes = require('./user')
const locationRoute = require('./location')




module.exports = (app) => {
    app.use('/api/v1', router)
    router.use('/users', userRoutes.userRoute)
    router.use('/location',locationRoute.location)
}