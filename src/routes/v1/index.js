const express = require('express');

const {Infocontroller} = require('../../controllers')

const userRoutes = require('./user-routes')

const router = express.Router();

router.get('/info',Infocontroller.info);

router.use('/user' , userRoutes)

module.exports = router;