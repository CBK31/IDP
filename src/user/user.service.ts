import bcrypt from "bcrypt";
import User from "./user.model";
import { ErrorMessages } from "./exceptions";

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

export const signUp = async (body: types.signup) => {
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

export const signIn = async (body: types.signin) => {
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

export const editProfile = async (body: types.editProfile, header: any) => {
  const token = header.split(" ")[1];
  const payload = await getUserTokenPayload(token);
  let user = await findUserById(payload._id);
  const {} = body;

  if (body.firstName) user.firstName = body.firstName;
  if (body.lastName) user.lastName = body.lastName;
  if (body.dob) user.dob = body.dob;
  if (body.email) user.email = body.email;

  await new userModel(user).save();

  return { message: "Profile updated successfully" };
};
