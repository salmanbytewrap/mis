/**
 * Router file
 * index.ts
 */

import { Router } from "express";
import misRouter from "../components/Mis/misRouter";
import loginRouter from "../components/login/loginRouter";

const router = Router();

router.use("/v1/mis", misRouter);
router.use("/v1/login", loginRouter);
export default router;
