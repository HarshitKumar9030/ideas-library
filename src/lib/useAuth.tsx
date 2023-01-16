import { useState, useEffect, useContext, useMemo, useCallback, createContext } from 'react'
import { useRouter } from 'next/router'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, OAuthCredential, signInWithPopup, User, signOut, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'


interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}


const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
    loading: true
})

interface AuthContextProps {
    children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthContextProps) => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [error, setError] = useState(null)
    const [user, setUser] = useState<User | null>(null)
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(
        () => onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user)
                    setLoading(false)
                } else {
                    setUser(null)
                    setLoading(false)
                }
                setInitialLoading(false)
            }),
            [auth]
    )

    const signUp = async (email: string, password: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            setUser(userCredential.user)
            router.push('/dashboard')
            setLoading(false)
        })
            .catch((error) => alert(error.message))
            .finally(() => {
                setLoading(false)
            })
    }

    const signIn = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            setUser(userCredential.user)
            router.push('/dashboard')
        })
            .catch((error) => alert(error.message))
            .finally(() => {
                setLoading(false)
            })
    }

    const signInWithGoogle = async () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential: OAuthCredential | null  = GoogleAuthProvider.credentialFromResult(result)
            const token = credential?.accessToken
            // The signed-in user info.
            const user = result.user
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            // ...
        })
        .finally(() => {
            setLoading(false)
        }
        )
    }


    const logout = async () => {
        setLoading(true)

        await signOut(auth).then(() => {
            setUser(null)
        }
        ).catch((error) => alert(error.message))
            .finally(() => {
                setLoading(false)
            })
    }

    const memoedValue = useMemo(() => ({
        user,
        signUp,
        signIn,
        logout,
        error,
        loading
    }), [user, loading])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    )

}
export default function useAuth() {
    return useContext(AuthContext)
}
