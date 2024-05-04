//   //   const token = jwt.sign({ email: email }, 'a_secret_key');
//   //             res.status(200).json({ token: token });
// };

import { inspect } from "util";

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
    //  console.log("the secret key is : " + process.env.JWT_SECRET_KEY);
    const payload = verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as CustomJwtPayload;
    if (!payload) {
      console.log("error handling : ma fi payload");
      return res.status(400).json("re7et 3al IDP w rje3et BAS MA L2IT PAYLOAD");
    }

    console.log("payload data : " + JSON.stringify(payload));

    //console.log("5allaset el payload step  res.userInfo.id : ");

    const responseBody = {
      message: "wsolet 3al function validate Token w rje3et",
      userId: payload.userId,
    };

    //console.log("token service / response body : " + inspect(responseBody));

    return res.status(200).json(responseBody);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Token validation failed" });
  }
};
