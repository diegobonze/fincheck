import { useContext } from "react";
import { createContext } from "react";
import { User } from "../../entities/User";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
  user: User | undefined
}

export const AuthContext = createContext({} as AuthContextValue)

export function useAuth() {
  return useContext(AuthContext)
}
