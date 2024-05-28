const { UserRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const userRepo = new UserRepository();
const { Auth } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

async function create(data) {
  try {
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    if (
      (error.name =
        "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError")
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot create a new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        "No user found for the given email",
        StatusCodes.NOT_FOUND
      );
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      throw new AppError("Invalid password", StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if(error instanceof AppError) throw error;
    console.log(error);
    throw new AppError('something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  create,
  signin
};
