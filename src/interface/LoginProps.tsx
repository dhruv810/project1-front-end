import { User } from "./User";

export interface LoginProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}