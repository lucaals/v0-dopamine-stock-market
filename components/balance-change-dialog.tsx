'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllUsers, modifyUserBalance, getUser } from '@/lib/game-store'
import { formatPrice } from '@/lib/stocks'
import type { UserAccount } from '@/lib/stocks'
import {
  DollarSign,
  X,
  Search,
  ChevronDown,
  Check,
  Plus,
  Minus,
  Zap,
} from 'lucide-react'

interface BalanceChangeDialogProps {
  open: boolean
  onClose: () => void
  onBalanceChanged: () => void
}

export function BalanceChangeDialog({ open, onClose, onBalanceChanged }: BalanceChangeDialogProps) {
  const [users, setUsers] = useState<UserAccount[]>([])
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState<'add' | 'remove'>('add')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (open) {
      const allUsers = getAllUsers()
      setUsers(allUsers)
      setMessage(null)
      setAmount('')
      if (allUsers.length > 0 && !selectedUser) {
        setSelectedUser(allUsers[0].username)
      }
    }
  }, [open, selectedUser])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setMessage({ text: 'Must be positive amount!!!!', type: 'error' })
      return
    }
    if (!selectedUser) {
      setMessage({ text: 'Select a user', type: 'error' })
      return
    }

    const finalAmount = mode === 'add' ? numAmount : -numAmount
    const result = modifyUserBalance(selectedUser, finalAmount)

    if (result.success) {
      setMessage({ text: result.message, type: 'success' })
      setAmount('')
      setUsers(getAllUsers())
      onBalanceChanged()
    } else {
      setMessage({ text: result.message, type: 'error' })
    }
  }, [amount, selectedUser, mode, onBalanceChanged])

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedUserData = users.find(u => u.username === selectedUser)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl shadow-primary/10 animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Balance Modifier</h2>
              <p className="text-xs text-muted-foreground">secret administrative panelen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* User selector */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Select Account
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-secondary px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary/50"
              >
                <div className="flex items-center gap-2">
                  {selectedUserData ? (
                    <>
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 font-mono text-xs font-bold text-primary">
                        {selectedUserData.username.slice(0, 1).toUpperCase()}
                      </div>
                      <span className="font-mono">{selectedUserData.username}</span>
                      <span className="text-xs text-muted-foreground">
                        ({formatPrice(selectedUserData.portfolio.cash)} cash)
                      </span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">Select a user...</span>
                  )}
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-border bg-card shadow-xl">
                  <div className="border-b border-border p-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search users..."
                        className="w-full rounded-md bg-secondary py-1.5 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto p-1">
                    {filteredUsers.length === 0 ? (
                      <div className="px-3 py-4 text-center text-xs text-muted-foreground">
                        No users found
                      </div>
                    ) : (
                      filteredUsers.map(u => (
                        <button
                          key={u.username}
                          type="button"
                          onClick={() => {
                            setSelectedUser(u.username)
                            setDropdownOpen(false)
                            setSearchQuery('')
                          }}
                          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-secondary"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 font-mono text-xs font-bold text-primary">
                              {u.username.slice(0, 1).toUpperCase()}
                            </div>
                            <span className="font-mono text-foreground">{u.username}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">
                              {formatPrice(u.portfolio.cash)}
                            </span>
                            {selectedUser === u.username && (
                              <Check className="h-3.5 w-3.5 text-primary" />
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mode toggle */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Action
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('add')}
                className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${mode === 'add'
                  ? 'border-gain/50 bg-gain/10 text-gain'
                  : 'border-border bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Plus className="h-4 w-4" />
                Add Funds (BIG PROFIT)
              </button>
              <button
                type="button"
                onClick={() => setMode('remove')}
                className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${mode === 'remove'
                  ? 'border-loss/50 bg-loss/10 text-loss'
                  : 'border-border bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Minus className="h-4 w-4" />
                Remove Funds (BROKE)
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Amount (American Dolla's)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="number"
                value={amount}
                onChange={e => {
                  setAmount(e.target.value)
                  setMessage(null)
                }}
                placeholder="1000"
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-border bg-secondary py-2.5 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {/* Quick amounts */}
            <div className="mt-2 flex gap-2">
              {[1000, 10000, 50000, 100000, 1000000].map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className="rounded-md bg-secondary/80 px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {preset >= 1000000 ? '1M' : `${preset / 1000}K`}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`rounded-lg px-3 py-2 text-sm font-medium ${message.type === 'success'
                ? 'bg-gain/10 text-gain'
                : 'bg-loss/10 text-loss'
                }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={`w-full rounded-lg py-3 font-semibold transition-all active:scale-[0.98] ${mode === 'add'
              ? 'bg-gain text-background hover:brightness-110'
              : 'bg-loss text-foreground hover:brightness-110'
              }`}
          >
            {mode === 'add' ? 'Add' : 'Remove'} {amount ? `$${parseFloat(amount).toLocaleString()}` : 'Funds'}
          </button>
        </form>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-xs text-muted-foreground/50">
          Secret admin panel - Balance changes take effect immediately
        </p>
      </div>
    </div>
  )
}
