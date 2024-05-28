const { userservice } = require('../services');

const { StatusCodes } = require('http-status-codes');

const { SuccessResponse,ErrorResponse } = require('../utils/common')

/**
 * POST : /signup
 * req.body {email:'vaibhavbansal123@gmail.com',password:'1234'}
 */
async function signup(req,res){
   try {
    const user = await userservice.create({
        email : req.body.email,
        password: req.body.password
   });
   SuccessResponse.data = user;
   return res
   .status(StatusCodes.CREATED)
   .json(SuccessResponse);
   } catch (error) {
    ErrorResponse.error = error;
    return res
    .status(error.statusCode)
    .json(ErrorResponse);
   }
}

module.exports = {
    signup
}