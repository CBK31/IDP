import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { findUserById } from "../user/user.service";
import * as types from "../types/index";
import { ErrorMessages } from "./exceptions";

export const generateTokenWithUserInfo = async (
  userInfo: types.tokenUserInfo
) => {
  const toSign: types.userInfoToSign = {
    exp: Math.floor(Date.now() / 1000) + 60 * 20,
    _id: userInfo._id,
    dob: userInfo.dob,
  };

  const token = jwt.sign(JSON.stringify(toSign), process.env.JWT_SECRET_KEY!);
  return token;
};

export const getUserTokenPayload = async (token: any) => {
  return verify(
    token,
    process.env.JWT_SECRET_KEY!
  ) as any as types.userInfoToSign;
};

export const validateToken = async (authentications: any) => {
  const token = authentications?.split(" ")[1];

  if (!token) {
    throw ErrorMessages.noAuthTokenProvided;
  }

  const payload = await getUserTokenPayload(token);

  if (!payload) {
    throw ErrorMessages.invalidAuthToken;
  }

  const userFinder = (await findUserById(payload._id)) as types.userObject;

  if (!userFinder) {
    throw ErrorMessages.tokenInfoMismatch;
  }

  const { _id, dob } = userFinder;
  const tokenUserInfoToSign: types.tokenUserInfo = { _id, dob };
  const tokenToSend = await generateTokenWithUserInfo(tokenUserInfoToSign);

  const responseBody = {
    token: tokenToSend,
    message: "User successfully authenticated.",
  };

  return responseBody;
};
