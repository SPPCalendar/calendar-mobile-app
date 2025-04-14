import { User } from "./User";

export type Calendar = {
  id: number;
  calendar_name: string;
  color: string;
  users: User[];
};
