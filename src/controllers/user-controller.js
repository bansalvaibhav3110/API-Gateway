const { userservice } = require("../services");

const { StatusCodes } = require("http-status-codes");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST : /signup
 * req.body {email:'vaibhavbansal123@gmail.com',password:'1234'}
 */
async function signup(req, res) {
  try {
    const user = await userservice.create({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signin(req, res) {
  try {
    const user = await userservice.signin({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addRoletoUser(req, res) {
  try {
    const role = await userservice.addRoletoUser({
      role: req.body.role,
      id: req.body.id,
    });
    SuccessResponse.data = role;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  signup,
  signin,
  addRoletoUser
};
