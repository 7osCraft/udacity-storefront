import express from "express";
import jwt from "jsonwebtoken";

export const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_SECRET || "");
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: `Invalid token. ${error}`,
    });
  }
};
