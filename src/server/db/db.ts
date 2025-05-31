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

  findUser(email: string) {
    return this.users.find((u) => u.email == email);
  }

  addUser(user: User) {
    this.users.push(user);
  }
}
