import { useContext } from "react";
import { createContext } from "react";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue)

export function useAuth() {
  return useContext(AuthContext)
}
