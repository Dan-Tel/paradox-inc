import type { User } from "../models/user.model";

export class DB {
  private static instance: DB;
  private users: User[] = [];

  static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB();
    }

    return DB.instance;
  }
}
