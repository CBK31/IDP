// import jwt from "jsonwebtoken";

// const verifyToken = async (token: string | undefined) => {
//   if (typeof token === "undefined") {
//     console.log("exception handeling verifyToken");
//   }
//   const JwtSecretKey = process.env.JWT_SECRET_KEY;

//   const TokenInfo = jwt.verify(token!, JwtSecretKey!);

//   console.log("my token info : ", TokenInfo);

//   //   const token = jwt.sign({ email: email }, 'a_secret_key');
//   //             res.status(200).json({ token: token });
// };

// export { verifyToken };
import { verify, JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export const validateToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    console.log("the sece key : " + process.env.JWT_SECRET_KEY);
    const payload = verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as CustomJwtPayload;
    console.log("payload data : " + payload.userId);
    res.data = payload;

    //console.log("5allaset el payload step : " + req.user.id);
    return res
      .status(200)
      .json({ message: "wsolet 3al function validateTokenw rje3et" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Token validation failed" });
  }
};
