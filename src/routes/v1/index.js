const express = require('express');

const {Infocontroller} = require('../../controllers')

const userRoutes = require('./user-routes')

const { AuthRequestMiddleware } = require('../../middlewares')

const router = express.Router();

router.get('/info',AuthRequestMiddleware.checkAuth,Infocontroller.info);

router.use('/user' , userRoutes)

module.exports = router;