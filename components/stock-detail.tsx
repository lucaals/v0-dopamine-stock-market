'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { type Stock, type UserAccount, formatPrice, formatPercent, formatNumber } from '@/lib/stocks'
import { buyStock, sellStock } from '@/lib/game-store'
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  DollarSign,
  Zap,
} from 'lucide-react'

interface StockDetailProps {
  stock: Stock
  user: UserAccount
  onBack: () => void
  onUserUpdate: (user: UserAccount) => void
}

export function StockDetail({ stock, user, onBack, onUserUpdate }: StockDetailProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [shares, setShares] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentHoldings = user.portfolio.holdings[stock.symbol] || 0
  const sharesNum = parseInt(shares) || 0
  const total = sharesNum * stock.currentPrice
  const maxBuyable = Math.floor(user.portfolio.cash / stock.currentPrice)
  const isUp = stock.changePercent >= 0
  const bigMove = Math.abs(stock.changePercent) > 5

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = 300
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)

    const data = stock.history
    const min = Math.min(...data) * 0.98
    const max = Math.max(...data) * 1.02
    const range = max - min || 1
    const padding = { top: 20, bottom: 30, left: 60, right: 20 }
    const chartW = width - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()

      const val = max - (range / 4) * i
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.font = '11px "Geist Mono", monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`$${val.toFixed(2)}`, padding.left - 8, y + 4)
    }

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    const color = isUp ? '#22c55e' : '#ef4444'
    gradient.addColorStop(0, isUp ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.beginPath()
    for (let i = 0; i < data.length; i++) {
      const x = padding.left + (i / (data.length - 1)) * chartW
      const y = padding.top + chartH - ((data[i] - min) / range) * chartH
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.lineTo(padding.left + chartW, padding.top + chartH)
    ctx.lineTo(padding.left, padding.top + chartH)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Line
    ctx.beginPath()
    for (let i = 0; i < data.length; i++) {
      const x = padding.left + (i / (data.length - 1)) * chartW
      const y = padding.top + chartH - ((data[i] - min) / range) * chartH
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()

    // Glow effect on last point
    const lastX = padding.left + chartW
    const lastY = padding.top + chartH - ((data[data.length - 1] - min) / range) * chartH

    ctx.beginPath()
    ctx.arc(lastX, lastY, 6, 0, Math.PI * 2)
    ctx.fillStyle = isUp ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(lastX, lastY, 3, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    // Mark spikes
    for (let i = 1; i < data.length; i++) {
      const pctChange = ((data[i] - data[i - 1]) / data[i - 1]) * 100
      if (Math.abs(pctChange) > 5) {
        const x = padding.left + (i / (data.length - 1)) * chartW
        const y = padding.top + chartH - ((data[i] - min) / range) * chartH
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = pctChange > 0 ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)'
        ctx.fill()
      }
    }
  }, [stock.history, isUp])

  useEffect(() => {
    drawChart()
    window.addEventListener('resize', drawChart)
    return () => window.removeEventListener('resize', drawChart)
  }, [drawChart])

  function handleTrade() {
    if (sharesNum <= 0) {
      setMessage({ text: 'Enter a valid number of shares', type: 'error' })
      return
    }

    const result =
      tradeType === 'buy'
        ? buyStock(user, stock, sharesNum)
        : sellStock(user, stock, sharesNum)

    setMessage({
      text: result.message,
      type: result.success ? 'success' : 'error',
    })

    if (result.success) {
      onUserUpdate(result.user)
      setShares('')
    }

    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary transition-colors hover:bg-secondary/80"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">{stock.symbol}</h2>
              {bigMove && (
                <span className={`animate-pulse rounded-full px-2 py-0.5 text-xs font-bold ${
                  isUp ? 'bg-gain/20 text-gain' : 'bg-loss/20 text-loss'
                }`}>
                  <Zap className="mr-1 inline h-3 w-3" />
                  {isUp ? 'SPIKE' : 'CRASH'}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{stock.name}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-3xl font-bold text-foreground">
            {formatPrice(stock.currentPrice)}
          </div>
          <div
            className={`flex items-center justify-end gap-1 font-mono text-sm font-medium ${
              isUp ? 'text-gain' : 'text-loss'
            }`}
          >
            {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {formatPercent(stock.changePercent)}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl border border-border bg-card p-4"
      >
        <canvas ref={canvasRef} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: '24h High', value: formatPrice(stock.high24h), icon: TrendingUp },
          { label: '24h Low', value: formatPrice(stock.low24h), icon: TrendingDown },
          { label: 'Volume', value: formatNumber(stock.volume), icon: BarChart3 },
          { label: 'Mkt Cap', value: `$${formatNumber(stock.marketCap)}`, icon: Activity },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="font-mono text-sm font-semibold text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Trade Panel */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Trade {stock.symbol}</h3>
        </div>

        {currentHoldings > 0 && (
          <div className="mb-4 rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary">
            You own <span className="font-bold">{currentHoldings}</span> shares worth{' '}
            <span className="font-bold">{formatPrice(currentHoldings * stock.currentPrice)}</span>
          </div>
        )}

        <div className="mb-4 flex rounded-lg bg-secondary p-1">
          <button
            onClick={() => setTradeType('buy')}
            className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
              tradeType === 'buy'
                ? 'bg-gain text-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeType('sell')}
            className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
              tradeType === 'sell'
                ? 'bg-loss text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sell
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm text-muted-foreground">
            Shares
            {tradeType === 'buy' && (
              <span className="ml-2 text-xs text-muted-foreground/70">
                (max: {maxBuyable.toLocaleString()})
              </span>
            )}
            {tradeType === 'sell' && (
              <span className="ml-2 text-xs text-muted-foreground/70">
                (own: {currentHoldings.toLocaleString()})
              </span>
            )}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={shares}
              onChange={e => setShares(e.target.value)}
              placeholder="0"
              min="1"
              className="flex-1 rounded-lg border border-border bg-secondary px-4 py-3 font-mono text-foreground placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={() =>
                setShares(
                  String(tradeType === 'buy' ? maxBuyable : currentHoldings)
                )
              }
              className="rounded-lg bg-secondary px-4 py-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              MAX
            </button>
          </div>
        </div>

        {sharesNum > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
            <span className="text-sm text-muted-foreground">Estimated Total</span>
            <span className="font-mono text-lg font-bold text-foreground">{formatPrice(total)}</span>
          </div>
        )}

        {message && (
          <div
            className={`mb-4 rounded-lg px-4 py-2 text-sm font-medium ${
              message.type === 'success'
                ? 'bg-gain/20 text-gain'
                : 'bg-loss/20 text-loss'
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          onClick={handleTrade}
          disabled={sharesNum <= 0}
          className={`w-full rounded-lg py-3 font-semibold transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed ${
            tradeType === 'buy'
              ? 'bg-gain text-background hover:brightness-110'
              : 'bg-loss text-foreground hover:brightness-110'
          }`}
        >
          {tradeType === 'buy' ? 'Buy' : 'Sell'} {stock.symbol}
          {sharesNum > 0 && ` - ${formatPrice(total)}`}
        </button>

        <div className="mt-3 text-center text-xs text-muted-foreground">
          Available Cash: {formatPrice(user.portfolio.cash)}
        </div>
      </div>
    </div>
  )
}
