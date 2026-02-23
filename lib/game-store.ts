'use client'

import { type Stock, type UserAccount, type Portfolio, type Transaction, initializeStocks, tickStocks } from './stocks'

const STORAGE_KEY = 'dopamine_user'
const ALL_USERS_KEY = 'dopamine_all_users'
const STARTING_CASH = 100000

export function getUser(): UserAccount | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return null
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function createUser(username: string): UserAccount {
  const user: UserAccount = {
    username,
    createdAt: Date.now(),
    portfolio: {
      cash: STARTING_CASH,
      holdings: {},
      totalValue: STARTING_CASH,
      transactions: [],
    },
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  // Also register in the all-users registry
  registerUser(user)
  return user
}

export function saveUser(user: UserAccount): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  // Keep the registry in sync
  registerUser(user)
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY)
}

// ── Multi-user registry for BALANCECHANGE ──

function registerUser(user: UserAccount): void {
  const all = getAllUsers()
  const idx = all.findIndex(u => u.username === user.username)
  if (idx >= 0) {
    all[idx] = user
  } else {
    all.push(user)
  }
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(all))
}

export function getAllUsers(): UserAccount[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(ALL_USERS_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function modifyUserBalance(username: string, amount: number): { success: boolean; message: string } {
  const all = getAllUsers()
  const idx = all.findIndex(u => u.username === username)
  if (idx < 0) {
    return { success: false, message: `User "${username}" not found` }
  }

  all[idx].portfolio.cash = Number((all[idx].portfolio.cash + amount).toFixed(2))
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(all))

  // If this is the currently logged-in user, also update the active session
  const current = getUser()
  if (current && current.username === username) {
    current.portfolio.cash = all[idx].portfolio.cash
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  }

  return {
    success: true,
    message: `${amount >= 0 ? 'Added' : 'Removed'} $${Math.abs(amount).toLocaleString()} ${amount >= 0 ? 'to' : 'from'} ${username}'s account`,
  }
}

export function buyStock(
  user: UserAccount,
  stock: Stock,
  shares: number
): { success: boolean; message: string; user: UserAccount } {
  const total = stock.currentPrice * shares
  if (total > user.portfolio.cash) {
    return { success: false, message: 'Insufficient funds', user }
  }

  const tx: Transaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    symbol: stock.symbol,
    type: 'buy',
    shares,
    price: stock.currentPrice,
    total,
    timestamp: Date.now(),
  }

  const updatedUser: UserAccount = {
    ...user,
    portfolio: {
      ...user.portfolio,
      cash: Number((user.portfolio.cash - total).toFixed(2)),
      holdings: {
        ...user.portfolio.holdings,
        [stock.symbol]: (user.portfolio.holdings[stock.symbol] || 0) + shares,
      },
      transactions: [tx, ...user.portfolio.transactions].slice(0, 200),
    },
  }

  saveUser(updatedUser)
  return { success: true, message: `Bought ${shares} shares of ${stock.symbol}`, user: updatedUser }
}

export function sellStock(
  user: UserAccount,
  stock: Stock,
  shares: number
): { success: boolean; message: string; user: UserAccount } {
  const currentHoldings = user.portfolio.holdings[stock.symbol] || 0
  if (shares > currentHoldings) {
    return { success: false, message: 'Not enough shares', user }
  }

  const total = stock.currentPrice * shares
  const tx: Transaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    symbol: stock.symbol,
    type: 'sell',
    shares,
    price: stock.currentPrice,
    total,
    timestamp: Date.now(),
  }

  const newHoldings = { ...user.portfolio.holdings }
  newHoldings[stock.symbol] = currentHoldings - shares
  if (newHoldings[stock.symbol] === 0) {
    delete newHoldings[stock.symbol]
  }

  const updatedUser: UserAccount = {
    ...user,
    portfolio: {
      ...user.portfolio,
      cash: Number((user.portfolio.cash + total).toFixed(2)),
      holdings: newHoldings,
      transactions: [tx, ...user.portfolio.transactions].slice(0, 200),
    },
  }

  saveUser(updatedUser)
  return { success: true, message: `Sold ${shares} shares of ${stock.symbol}`, user: updatedUser }
}

export function calculatePortfolioValue(portfolio: Portfolio, stocks: Stock[]): number {
  let holdingsValue = 0
  for (const [symbol, shares] of Object.entries(portfolio.holdings)) {
    const stock = stocks.find(s => s.symbol === symbol)
    if (stock) {
      holdingsValue += stock.currentPrice * shares
    }
  }
  return Number((portfolio.cash + holdingsValue).toFixed(2))
}

export { initializeStocks, tickStocks }
