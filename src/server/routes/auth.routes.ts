import type { RequestHandler } from "express";
import { Router } from "express";
export const router = Router();

import { register, login, check } from "../controllers/auth.controller";

router.post("/register", register as unknown as RequestHandler);
router.post("/login", login as unknown as RequestHandler);
router.post("/check", check as unknown as RequestHandler);
