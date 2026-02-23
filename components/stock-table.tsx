'use client'

import { useState, useMemo } from 'react'
import { type Stock, formatPrice, formatPercent, formatNumber } from '@/lib/stocks'
import { MiniChart } from './mini-chart'
import { Search, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react'

interface StockTableProps {
  stocks: Stock[]
  onSelectStock: (symbol: string) => void
}

type SortKey = 'symbol' | 'price' | 'change' | 'volume' | 'marketCap'
type SortDir = 'asc' | 'desc'

export function StockTable({ stocks, onSelectStock }: StockTableProps) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('marketCap')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [sectorFilter, setSectorFilter] = useState<string>('All')

  const sectors = useMemo(() => {
    const s = new Set(stocks.map(st => st.sector))
    return ['All', ...Array.from(s).sort()]
  }, [stocks])

  const filteredStocks = useMemo(() => {
    let list = stocks

    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
      )
    }

    if (sectorFilter !== 'All') {
      list = list.filter(s => s.sector === sectorFilter)
    }

    list = [...list].sort((a, b) => {
      let aVal: number, bVal: number
      switch (sortKey) {
        case 'symbol':
          return sortDir === 'asc'
            ? a.symbol.localeCompare(b.symbol)
            : b.symbol.localeCompare(a.symbol)
        case 'price':
          aVal = a.currentPrice
          bVal = b.currentPrice
          break
        case 'change':
          aVal = a.changePercent
          bVal = b.changePercent
          break
        case 'volume':
          aVal = a.volume
          bVal = b.volume
          break
        case 'marketCap':
          aVal = a.marketCap
          bVal = b.marketCap
          break
        default:
          return 0
      }
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal
    })

    return list
  }, [stocks, search, sortKey, sortDir, sectorFilter])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search stocks..."
            className="w-full rounded-lg border border-border bg-secondary py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-64"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => setSectorFilter(sector)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                sectorFilter === sector
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('symbol')}
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  Stock <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-right sm:table-cell">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Chart</span>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('price')}
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  Price <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('change')}
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  Change <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-right lg:table-cell">
                <button
                  onClick={() => handleSort('volume')}
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  Volume <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-right md:table-cell">
                <button
                  onClick={() => handleSort('marketCap')}
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  Mkt Cap <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map(stock => (
              <tr
                key={stock.symbol}
                onClick={() => onSelectStock(stock.symbol)}
                className="cursor-pointer border-b border-border/50 transition-colors hover:bg-secondary/30"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary font-mono text-xs font-bold text-foreground">
                      {stock.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-mono text-sm font-semibold text-foreground">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-right sm:table-cell">
                  <div className="flex justify-end">
                    <MiniChart
                      data={stock.history.slice(-30)}
                      width={80}
                      height={32}
                      positive={stock.changePercent >= 0}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {formatPrice(stock.currentPrice)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex flex-col items-end">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-sm font-medium ${
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
                    <span
                      className={`font-mono text-xs ${
                        stock.change >= 0 ? 'text-gain/70' : 'text-loss/70'
                      }`}
                    >
                      {stock.change >= 0 ? '+' : ''}
                      {formatPrice(Math.abs(stock.change))}
                    </span>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-right lg:table-cell">
                  <span className="font-mono text-sm text-muted-foreground">{formatNumber(stock.volume)}</span>
                </td>
                <td className="hidden px-4 py-3 text-right md:table-cell">
                  <span className="font-mono text-sm text-muted-foreground">${formatNumber(stock.marketCap)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStocks.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No stocks found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}
