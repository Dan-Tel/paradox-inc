import { sign } from "jsonwebtoken";
import type { User } from "../models/user.model";

export function generateAccessToken(payload: User) {
  return sign(payload, "SECRET_KEY", { expiresIn: "24h" });
}
