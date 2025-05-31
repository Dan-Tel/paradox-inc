import type { Request, Response } from "express";
import type { User } from "../models/user.model";
import { DB } from "../db/db";
import { generateAccessToken } from "../utils/generateAccessToken";
import { verify } from "jsonwebtoken";
const db = DB.getInstance();

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = db.findUser(email);

    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      tasks: [],
    };

    db.addUser(newUser);

    const token = generateAccessToken(newUser);
    return res.json({ userId: newUser.id, accessToken: token });
  } catch {
    res.status(400).json({ message: "Registration error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = db.findUser(email);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    const validPassword = user.password === password;
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const token = generateAccessToken(user);
    return res.json({ userId: user.id, accessToken: token });
  } catch {
    return res.status(400).json({ message: "Login error" });
  }
}

export async function check(req: Request, res: Response) {
  try {
    const { accessToken } = req.body;

    const decoded = verify(accessToken, "SECRET_KEY") as User;

    if (!decoded) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const user = db.findUser(decoded.email);

    if (!user || user.id !== decoded.id || user.password !== decoded.password) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    return res.json({ user: user });
  } catch {
    return res.status(403).json({ message: "Unauthorized" });
  }
}
