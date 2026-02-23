'use client'

import { useState, useEffect } from 'react'
import { getUser } from '@/lib/game-store'
import { AuthScreen } from '@/components/auth-screen'
import { Dashboard } from '@/components/dashboard'
import { Activity } from 'lucide-react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const user = getUser()
    setIsLoggedIn(!!user)
  }, [])

  if (isLoggedIn === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Activity className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return <AuthScreen onLogin={() => setIsLoggedIn(true)} />
  }

  return <Dashboard onLogout={() => setIsLoggedIn(false)} />
}
