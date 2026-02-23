'use client'

import { type Stock, type UserAccount, formatPrice, formatPercent } from '@/lib/stocks'
import { calculatePortfolioValue } from '@/lib/game-store'
import { MiniChart } from './mini-chart'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Clock,
  Briefcase,
} from 'lucide-react'

interface PortfolioPanelProps {
  user: UserAccount
  stocks: Stock[]
  onSelectStock: (symbol: string) => void
}

export function PortfolioPanel({ user, stocks, onSelectStock }: PortfolioPanelProps) {
  const totalValue = calculatePortfolioValue(user.portfolio, stocks)
  const totalGain = totalValue - 100000
  const totalGainPct = (totalGain / 100000) * 100
  const isUp = totalGain >= 0

  const holdings = Object.entries(user.portfolio.holdings)
    .map(([symbol, shares]) => {
      const stock = stocks.find(s => s.symbol === symbol)
      if (!stock) return null
      const value = stock.currentPrice * shares
      // Calculate cost basis from transactions
      const buyTxs = user.portfolio.transactions.filter(
        t => t.symbol === symbol && t.type === 'buy'
      )
      const totalCost = buyTxs.reduce((acc, t) => acc + t.total, 0)
      const totalShares = buyTxs.reduce((acc, t) => acc + t.shares, 0)
      const avgCost = totalShares > 0 ? totalCost / totalShares : stock.currentPrice
      const gain = (stock.currentPrice - avgCost) * shares
      const gainPct = ((stock.currentPrice - avgCost) / avgCost) * 100

      return {
        symbol,
        name: stock.name,
        shares,
        price: stock.currentPrice,
        value,
        gain,
        gainPct,
        history: stock.history,
        changePercent: stock.changePercent,
      }
    })
    .filter(Boolean) as NonNullable<ReturnType<typeof Object.entries>>[]

  const recentTxs = user.portfolio.transactions.slice(0, 10)

  return (
    <div className="flex flex-col gap-6">
      {/* Portfolio Summary */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Wallet className="h-4 w-4" />
          Portfolio Value
        </div>
        <div className="mb-1 font-mono text-4xl font-bold text-foreground">
          {formatPrice(totalValue)}
        </div>
        <div
          className={`flex items-center gap-1 font-mono text-sm font-medium ${
            isUp ? 'text-gain' : 'text-loss'
          }`}
        >
          {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {isUp ? '+' : ''}
          {formatPrice(totalGain)} ({formatPercent(totalGainPct)})
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-secondary p-3">
            <div className="text-xs text-muted-foreground">Cash</div>
            <div className="font-mono text-sm font-semibold text-foreground">
              {formatPrice(user.portfolio.cash)}
            </div>
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <div className="text-xs text-muted-foreground">Holdings</div>
            <div className="font-mono text-sm font-semibold text-foreground">
              {formatPrice(totalValue - user.portfolio.cash)}
            </div>
          </div>
        </div>
      </div>

      {/* Holdings */}
      {holdings.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Briefcase className="h-4 w-4" />
            Your Holdings ({holdings.length})
          </div>
          <div className="flex flex-col gap-3">
            {(holdings as {
              symbol: string
              name: string
              shares: number
              price: number
              value: number
              gain: number
              gainPct: number
              history: number[]
              changePercent: number
            }[]).map(h => (
              <button
                key={h.symbol}
                onClick={() => onSelectStock(h.symbol)}
                className="flex items-center justify-between rounded-lg bg-secondary p-3 transition-colors hover:bg-secondary/80"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background font-mono text-xs font-bold text-foreground">
                    {h.symbol.slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-sm font-semibold text-foreground">
                      {h.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {h.shares} shares
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MiniChart
                    data={h.history.slice(-20)}
                    width={60}
                    height={24}
                    positive={h.changePercent >= 0}
                  />
                  <div className="text-right">
                    <div className="font-mono text-sm font-semibold text-foreground">
                      {formatPrice(h.value)}
                    </div>
                    <div
                      className={`font-mono text-xs font-medium ${
                        h.gain >= 0 ? 'text-gain' : 'text-loss'
                      }`}
                    >
                      {h.gain >= 0 ? '+' : ''}
                      {formatPrice(h.gain)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      {recentTxs.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="h-4 w-4" />
            Recent Trades
          </div>
          <div className="flex flex-col gap-2">
            {recentTxs.map(tx => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs font-bold ${
                      tx.type === 'buy'
                        ? 'bg-gain/20 text-gain'
                        : 'bg-loss/20 text-loss'
                    }`}
                  >
                    {tx.type.toUpperCase()}
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    {tx.shares} {tx.symbol}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm text-foreground">
                    {formatPrice(tx.total)}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    @ {formatPrice(tx.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {holdings.length === 0 && recentTxs.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Briefcase className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">
            No holdings yet. Start trading to build your portfolio!
          </p>
        </div>
      )}
    </div>
  )
}
