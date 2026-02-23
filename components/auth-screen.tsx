'use client'

import { useState } from 'react'
import { VALID_INVITE_CODES } from '@/lib/stocks'
import { createUser } from '@/lib/game-store'
import { TrendingUp, Zap, AlertTriangle } from 'lucide-react'

interface AuthScreenProps {
  onLogin: () => void
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [step, setStep] = useState<'invite' | 'username'>('invite')
  const [inviteCode, setInviteCode] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  function handleInviteSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (VALID_INVITE_CODES.includes(inviteCode.toUpperCase().trim())) {
      setError('')
      setStep('username')
    } else {
      setError('Invalid invite code')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  function handleUsernameSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = username.trim()
    if (trimmed.length < 2) {
      setError('Username must be at least 2 characters')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    if (trimmed.length > 16) {
      setError('Username must be 16 characters or less')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    createUser(trimmed)
    onLogin()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-loss/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm text-primary">Simulated Trading</span>
          </div>
          <h1 className="mb-2 text-5xl font-bold tracking-tight text-foreground">
            DOPAMINE
          </h1>
          <p className="text-muted-foreground">
            The stock market that hits different.
          </p>
        </div>

        <div
          className={`rounded-xl border border-border bg-card p-6 shadow-2xl shadow-primary/5 ${
            shake ? 'animate-shake' : ''
          }`}
          style={shake ? { animation: 'shake 0.5s ease-in-out' } : {}}
        >
          {step === 'invite' ? (
            <form onSubmit={handleInviteSubmit}>
              <label className="mb-2 block text-sm font-medium text-muted-foreground">
                Invite Code
              </label>
              <input
                type="text"
                value={inviteCode}
                onChange={e => {
                  setInviteCode(e.target.value)
                  setError('')
                }}
                placeholder="Enter your invite code"
                className="mb-4 w-full rounded-lg border border-border bg-secondary px-4 py-3 font-mono text-sm text-foreground uppercase tracking-wider placeholder:text-muted-foreground/50 placeholder:normal-case focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
              {error && (
                <div className="mb-4 flex items-center gap-2 text-sm text-loss">
                  <AlertTriangle className="h-4 w-4" />
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Verify Code
              </button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {"Don't have an invite? Ask someone who's already in."}
              </p>
            </form>
          ) : (
            <form onSubmit={handleUsernameSubmit}>
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
                <TrendingUp className="h-4 w-4" />
                {"You're in! Choose your trader name."}
              </div>
              <label className="mb-2 block text-sm font-medium text-muted-foreground">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => {
                  setUsername(e.target.value)
                  setError('')
                }}
                placeholder="diamondhands42"
                className="mb-4 w-full rounded-lg border border-border bg-secondary px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
                maxLength={16}
              />
              {error && (
                <div className="mb-4 flex items-center gap-2 text-sm text-loss">
                  <AlertTriangle className="h-4 w-4" />
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Start Trading
              </button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                You start with $100,000 in simulated cash.
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}
