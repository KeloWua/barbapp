import { useEffect, useState } from "react"
import { Slot, useRouter, useSegments } from "expo-router"
import { Session } from "@supabase/supabase-js"
import { supabase } from "../lib/supabase"

export default function RootLayout() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const segments = useSegments()

    useEffect(() => {
        // Check for active session at start
        supabase.auth.getSession().then(({data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        // Listen to session changes (login, logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        if (loading) return

        const inAuthGroup = segments[0] === '(auth)'

        if (!session && !inAuthGroup) {
            // No session: redirect to login
            router.replace('/(auth)/login')
        } else if (session && inAuthGroup) {
            // Session found: redirect to home
            router.replace('/(client)')
        }
        
    }, [session, loading, segments])

    return <Slot />
}