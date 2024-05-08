import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";
import User from "./user.model";
import { ErrorMessages } from "./exceptions";
import { signinDto } from "./user.dto/signin.dto";
import { signupDto } from "./user.dto/signup.dto";
import { CustomError } from "./exceptions";
//import { verify, JwtPayload } from "jsonwebtoken";
import {
  generateTokenWithUserInfo,
  getUserTokenPayload,
} from "../token/token.service";
import * as types from "../types/index";
import userModel from "./user.model";

export const findUserById = async (
  userId: string
): Promise<types.userObject> => {
  return User.findOne({ _id: userId });
};

const findUserByEmail = async (email: string): Promise<types.userObject> => {
  return User.findOne({ email: email });
};

export const signUp = async (body: signupDto) => {
  const { firstName, lastName, email, password, dob } = body;

  const userFinder = await findUserByEmail(email);

  if (userFinder) {
    throw ErrorMessages.userAlreadyExists;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await new userModel({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
    dob: dob,
  }).save();

  const responseBody = {
    message: "User created successfully",
  };

  return responseBody;
};

export const signIn = async (body: signinDto) => {
  const { email: bodyEmail, password } = body;

  const user = await findUserByEmail(bodyEmail);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw ErrorMessages.invalidEmailOrPassword;
  }

  const { _id, dob } = user;
  const tokenUserInfoToSign: types.tokenUserInfo = { _id, dob };
  const token = await generateTokenWithUserInfo(tokenUserInfoToSign);
  const responseBody = {
    token: token,
    message: "User signed in successfully",
  };

  return responseBody;
};

export const viewProfile = async (header: any) => {
  const token = header.split(" ")[1];
  const payload = await getUserTokenPayload(token);
  const userFinder = await findUserById(payload._id);

  // this token is verified by the authenticator

  const { _id, dob, email, firstName, lastName } = userFinder;
  return {
    userInfo: {
      _id,
      dob,
      email,
      firstName,
      lastName,
    },
  };
};

export const editProfile = async (body: any) => {
  //  // Fetch the user by ID
  //  const user = await UserModel.findById(userId);
  //  if (!user) {
  //      throw new Error('User not found');
  //  }
  //  // Update the user fields that are allowed to be updated
  //  if (editUserDto.firstName) user.firstName = editUserDto.firstName;
  //  if (editUserDto.lastName) user.lastName = editUserDto.lastName;
  //  if (editUserDto.dateOfBirth) user.dateOfBirth = editUserDto.dateOfBirth;
  //  // Save the updated user
  //  await user.save();
  //  // Return the updated user data or a success message
  //  return { message: "Profile updated successfully", user };
  // } catch (error) {
  //  // Log the error or handle it as needed
  //  console.error('Failed to update user profile:', error);
  //  throw error; // Rethrow or handle as needed
  // }
};

// const editUserSchema = Joi.object({
//   firstName: Joi.string().alphanumeric().min(3).max(30),
//   lastName: Joi.string().alphanumeric().min(3).max(30),
//   dateOfBirth: Joi.date().less('now')
// });
