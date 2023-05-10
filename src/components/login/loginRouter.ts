/**
 * userRouter.ts
 */

import { Router } from "express";

import * as loginController from "./loginController";
const router = Router();

router.get("/", loginController.login);

export default router;
