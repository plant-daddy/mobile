// import { router, useNavigation, usePathname, useSegments } from 'expo-router'
// import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

// type AuthState =
//   | {
//       authenticated: false
//       loading: boolean
//     }
//   | {
//       authenticated: true
//       loading: false
//       token: string
//     }

// type AuthContextData = {
//   signIn: (params: { email: string; password: string }) => Promise<void>
//   signUp: (params: { email: string; password: string; name: string }) => Promise<void>
//   signOut: () => void
// } & AuthState

// const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// const useProtectedRoute = (user: AuthState) => {
//   const segments = useSegments()
//   const pathname = usePathname()

//   useEffect(() => {
//     const inAuthGroup = segments[0] === '(public)'

//     if (!user.authenticated && !inAuthGroup && pathname !== '' && pathname !== '/')
//       router.replace('/carousel')
//     else if (user.authenticated && inAuthGroup) router.push('/(tabs)/home')
//   }, [user, segments])
// }

// export const AuthProvider = ({ children }: React.PropsWithChildren) => {
//   const [authState, setAuthState] = useState({
//     authenticated: false,
//     loading: true
//   } as AuthState)

//   const signIn = useCallback(
//     async ({ email, password }: { email: string; password: string }) => {
//       setAuthState({
//         authenticated: true,
//         loading: false,
//         token: email
//       })
//     },
//     [setAuthState]
//   )

//   const signUp = useCallback(
//     async ({ email, password, name }: { email: string; password: string; name: string }) => {
//       setAuthState({
//         authenticated: true,
//         loading: false,
//         token: email
//       })
//     },
//     [setAuthState]
//   )

//   const signOut = useCallback(() => {
//     setAuthState({
//       authenticated: false,
//       loading: false
//     })
//   }, [])

//   useProtectedRoute(authState)

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn,
//         signUp,
//         signOut,
//         ...authState
//       }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth(): AuthContextData {
//   const context = useContext(AuthContext)

//   if (!context) throw new Error('useAuth must be used within an AuthProvider.')

//   return context
// }
