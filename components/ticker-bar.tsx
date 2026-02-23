'use client'

import { type Stock, formatPrice, formatPercent } from '@/lib/stocks'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface TickerBarProps {
  stocks: Stock[]
}

export function TickerBar({ stocks }: TickerBarProps) {
  const items = [...stocks, ...stocks]

  return (
    <div className="w-full overflow-hidden border-b border-border bg-card/50">
      <div className="animate-ticker flex whitespace-nowrap py-2">
        {items.map((stock, i) => (
          <div key={`${stock.symbol}-${i}`} className="mx-4 inline-flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-foreground">{stock.symbol}</span>
            <span className="font-mono text-xs text-muted-foreground">{formatPrice(stock.currentPrice)}</span>
            <span
              className={`inline-flex items-center gap-0.5 font-mono text-xs font-medium ${
                stock.changePercent >= 0 ? 'text-gain' : 'text-loss'
              }`}
            >
              {stock.changePercent >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {formatPercent(stock.changePercent)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
