import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./useAuth";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import toast from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedaccessToken = localStorage.getItem(localStorageKeys.ACESS_TOKEN)

    return !!storedaccessToken
  })

  const queryClient = useQueryClient()

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey:['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity
  })

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACESS_TOKEN, accessToken)
    setSignedIn(true)
  }, [])

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACESS_TOKEN)
    queryClient.clear()

    setSignedIn(false)
  }, [queryClient])

  useEffect(() => {
    if(isError) {
      toast.error('Sua sessão exprirou!')
      signout()
    }
  }, [signout, isError])

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        signout,
        user: data
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  )
}
