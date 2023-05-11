/**
 * userRouter.ts
 */

import { Router } from "express";
import { decodeToken } from "../../helpers/JwtHelper";
import * as misController from "./misController";

const router = Router();

router.post("/", decodeToken, misController.create);
router.get("/", misController.getAllusers);

export default router;
