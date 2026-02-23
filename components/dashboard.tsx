'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { type Stock, type UserAccount, formatPrice, formatPercent } from '@/lib/stocks'
import {
  initializeStocks,
  tickStocks,
  getUser,
  saveUser,
  logout,
  calculatePortfolioValue,
} from '@/lib/game-store'
import { TickerBar } from './ticker-bar'
import { StockTable } from './stock-table'
import { StockDetail } from './stock-detail'
import { PortfolioPanel } from './portfolio-panel'
import { BalanceChangeDialog } from './balance-change-dialog'
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  TrendingDown,
  LogOut,
  Zap,
  Activity,
  AlertTriangle,
} from 'lucide-react'

type View = 'market' | 'portfolio'

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [user, setUser] = useState<UserAccount | null>(null)
  const [view, setView] = useState<View>('market')
  const [selectedStock, setSelectedStock] = useState<string | null>(null)
  const [alerts, setAlerts] = useState<{ text: string; type: 'spike' | 'crash' }[]>([])
  const [balanceDialogOpen, setBalanceDialogOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const secretBufferRef = useRef('')

  useEffect(() => {
    const initialStocks = initializeStocks()
    setStocks(initialStocks)
    const u = getUser()
    if (u) setUser(u)
  }, [])

  const handleTick = useCallback(() => {
    setStocks(prev => {
      const newStocks = tickStocks(prev)

      const newAlerts: { text: string; type: 'spike' | 'crash' }[] = []
      for (const stock of newStocks) {
        if (stock.changePercent > 5) {
          newAlerts.push({ text: `${stock.symbol} ${formatPercent(stock.changePercent)}`, type: 'spike' })
        } else if (stock.changePercent < -5) {
          newAlerts.push({ text: `${stock.symbol} ${formatPercent(stock.changePercent)}`, type: 'crash' })
        }
      }
      if (newAlerts.length > 0) {
        setAlerts(newAlerts.slice(0, 3))
        if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current)
        alertTimeoutRef.current = setTimeout(() => setAlerts([]), 4000)
      }

      return newStocks
    })
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(handleTick, 1500)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current)
    }
  }, [handleTick])

  useEffect(() => {
    const SECRET_CODE = 'BALANCECHANGE'
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture when typing in input fields
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      const key = e.key.toUpperCase()
      if (key.length === 1 && /[A-Z]/.test(key)) {
        secretBufferRef.current += key
        // Keep only the last N characters where N is the length of the secret code
        if (secretBufferRef.current.length > SECRET_CODE.length) {
          secretBufferRef.current = secretBufferRef.current.slice(-SECRET_CODE.length)
        }
        if (secretBufferRef.current === SECRET_CODE) {
          secretBufferRef.current = ''
          setBalanceDialogOpen(true)
        }
      } else {
        secretBufferRef.current = ''
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleBalanceChanged() {
    const u = getUser()
    if (u) setUser(u)
  }

  function handleLogout() {
    logout()
    onLogout()
  }

  function handleUserUpdate(updatedUser: UserAccount) {
    setUser(updatedUser)
    saveUser(updatedUser)
  }

  function handleSelectStock(symbol: string) {
    setSelectedStock(symbol)
  }

  if (!user || stocks.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Activity className="h-8 w-8 animate-spin text-primary" />
          <span className="font-mono text-sm text-muted-foreground">Loading markets...</span>
        </div>
      </div>
    )
  }

  const portfolioValue = calculatePortfolioValue(user.portfolio, stocks)
  const totalGain = portfolioValue - 100000
  const isPortfolioUp = totalGain >= 0
  const selected = selectedStock ? stocks.find(s => s.symbol === selectedStock) : null

  // Find biggest movers
  const topGainer = [...stocks].sort((a, b) => b.changePercent - a.changePercent)[0]
  const topLoser = [...stocks].sort((a, b) => a.changePercent - b.changePercent)[0]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TickerBar stocks={stocks} />

      <BalanceChangeDialog
        open={balanceDialogOpen}
        onClose={() => setBalanceDialogOpen(false)}
        onBalanceChanged={handleBalanceChanged}
      />

      {/* Alert toasts */}
      {alerts.length > 0 && (
        <div className="fixed right-4 top-16 z-50 flex flex-col gap-2">
          {alerts.map((alert, i) => (
            <div
              key={`${alert.text}-${i}`}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm font-bold shadow-lg animate-in slide-in-from-right-5 ${alert.type === 'spike'
                ? 'bg-gain/90 text-background'
                : 'bg-loss/90 text-foreground'
                }`}
            >
              {alert.type === 'spike' ? (
                <Zap className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              {alert.text}
            </div>
          ))}
        </div>
      )}

      {/* Top nav */}
      <header className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold tracking-tight text-foreground">Dopamine</span>
          </div>
          <div className="hidden items-center gap-1 sm:flex">
            <button
              onClick={() => {
                setView('market')
                setSelectedStock(null)
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${view === 'market' && !selectedStock
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Market
            </button>
            <button
              onClick={() => {
                setView('portfolio')
                setSelectedStock(null)
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${view === 'portfolio'
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <Briefcase className="h-4 w-4" />
              Portfolio
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <div className="font-mono text-sm font-semibold text-foreground">
              {formatPrice(portfolioValue)}
            </div>
            <div
              className={`font-mono text-xs font-medium ${isPortfolioUp ? 'text-gain' : 'text-loss'
                }`}
            >
              {isPortfolioUp ? '+' : ''}
              {formatPercent((totalGain / 100000) * 100)}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-mono text-xs text-foreground">{user.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="flex border-b border-border bg-card/30 sm:hidden">
        <button
          onClick={() => {
            setView('market')
            setSelectedStock(null)
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium ${view === 'market' && !selectedStock
            ? 'border-b-2 border-primary text-foreground'
            : 'text-muted-foreground'
            }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Market
        </button>
        <button
          onClick={() => {
            setView('portfolio')
            setSelectedStock(null)
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium ${view === 'portfolio'
            ? 'border-b-2 border-primary text-foreground'
            : 'text-muted-foreground'
            }`}
        >
          <Briefcase className="h-4 w-4" />
          Portfolio
        </button>
      </div>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6">
        {selected ? (
          <div className="mx-auto max-w-4xl">
            <StockDetail
              stock={selected}
              user={user}
              onBack={() => setSelectedStock(null)}
              onUserUpdate={handleUserUpdate}
            />
          </div>
        ) : view === 'market' ? (
          <div className="mx-auto max-w-7xl">
            {/* Top movers */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <button
                onClick={() => handleSelectStock(topGainer.symbol)}
                className="flex items-center gap-3 rounded-xl border border-gain/20 bg-gain/5 p-4 text-left transition-colors hover:bg-gain/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gain/20">
                  <TrendingUp className="h-5 w-5 text-gain" />
                </div>
                <div>
                  <div className="text-xs text-gain/70">Highest Gain</div>
                  <div className="font-mono text-sm font-bold text-gain">
                    {topGainer.symbol} {formatPercent(topGainer.changePercent)}
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleSelectStock(topLoser.symbol)}
                className="flex items-center gap-3 rounded-xl border border-loss/20 bg-loss/5 p-4 text-left transition-colors hover:bg-loss/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-loss/20">
                  <TrendingDown className="h-5 w-5 text-loss" />
                </div>
                <div>
                  <div className="text-xs text-loss/70">Highest Loss</div>
                  <div className="font-mono text-sm font-bold text-loss">
                    {topLoser.symbol} {formatPercent(topLoser.changePercent)}
                  </div>
                </div>
              </button>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Portfolio</div>
                  <div className={`font-mono text-sm font-bold ${isPortfolioUp ? 'text-gain' : 'text-loss'}`}>
                    {formatPrice(portfolioValue)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">P&L (Profit & Loss)</div>
                  <div className={`font-mono text-sm font-bold ${isPortfolioUp ? 'text-gain' : 'text-loss'}`}>
                    {isPortfolioUp ? '+' : ''}{formatPrice(totalGain)}
                  </div>
                </div>
              </div>
            </div>

            <StockTable stocks={stocks} onSelectStock={handleSelectStock} />
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <PortfolioPanel
              user={user}
              stocks={stocks}
              onSelectStock={handleSelectStock}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 px-4 py-3 text-center">
        <span className="font-mono text-xs text-muted-foreground/50">
          DOPAMINE - Prices update every 1.5s
        </span>
      </footer>
    </div>
  )
}
