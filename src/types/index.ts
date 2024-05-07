import { JwtPayload } from "jsonwebtoken";
import { signinDto } from "../user/user.dto/signin.dto";
import { signupDto } from "../user/user.dto/signup.dto";

export interface userObject extends signupDto {
  _id: string;
}

// export interface userPayload extends JwtPayload {
//   _id: string;
//   dob: Date;

// }

// export interface userPayload extends toSignUserInfo {
//   _id: string;
// }

export interface tokenUserInfo {
  _id: string;
  dob: Date;
}

export interface userInfoToSign extends tokenUserInfo {
  exp: Number;
}
