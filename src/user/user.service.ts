import { IUser, SignInResponse } from "../types/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./user.model";
import { ErrorMessages } from "./exceptions";
import { signinDto } from "./user.dto/signin.dto";
import { signupDto } from "./user.dto/signup.dto";
import { verify, JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

interface user extends signupDto {
  _id: string;
}

const findUserById = async (userId: string): Promise<user> => {
  return User.findOne({ _id: userId });
};
const findUserByEmail = async (email: string): Promise<user> => {
  return User.findOne({ email: email });
};

export const signUp = async (body: signupDto) => {
  const { firstName, lastName, email, password, dob } = body;
  let hashedPassword = await bcrypt.hash(password, 12);

  const userFinder = await findUserByEmail(email);

  if (userFinder) {
    throw ErrorMessages.userAlreadySignup;
  } else {
    const responseBody = {
      message: "wsolet 3al function validate Token w rje3et",
      userId: "my user iddddd",
    };

    return responseBody;
    return "kell chi tamem ";
  }
};

export const signIn = async (body: signinDto) => {
  const { email, password } = body;

  const user = await findUserByEmail(email);
  if (!user) {
    console.log("error handeler wrong email or password ;");
  }

  const passwordIsValid = bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    console.log("error handeler wrong email or password ;");
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: 3600,
  });

  return { token: token };
};

//const requestToken = headers.authorization?.split(" ")[1];
