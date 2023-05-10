/**
 * JwtHelper.ts
 */

import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction, response } from "express";
import config from "../config/Config";
import { ResponseError } from "../utils/ResponseClass";

export async function createToken(payload) {
  const expiry: number = 60 * 24 * 60 * 60;
  const expiryStamp: number = Date.now() + expiry * 1000;
  const token = jwt.sign(payload, config.JWTSECRET, {
    algorithm: "HS384",
    expiresIn: expiry,
    issuer: config.ISSUER,
  });
  return { access_token: token, expirOn: expiryStamp };
}

export const decodeToken = async (req, res, callback: NextFunction) => {
  const token = req.header("idToken");
  if (token != "" && token != undefined) {
    try {
      const result: any = await jwt.verify(token, config.JWTSECRET);
      req.user = result;
      callback();
    } catch (error) {
      let response = new ResponseError({
        error: "Authorization failed.",
        message: error.message,
      });
      return res.status(401).json(response);
    }
  } else {
    let response = new ResponseError({
      message: "Authorization failed.",
      error: "'idToken' field is required",
    });
    return res.status(400).json(response);
  }
};


