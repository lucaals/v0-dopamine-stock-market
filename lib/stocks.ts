export interface Stock {
  symbol: string
  name: string
  sector: string
  basePrice: number
  currentPrice: number
  previousPrice: number
  change: number
  changePercent: number
  high24h: number
  low24h: number
  volume: number
  marketCap: number
  history: number[]
}

export interface Portfolio {
  cash: number
  holdings: { [symbol: string]: number }
  totalValue: number
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  symbol: string
  type: 'buy' | 'sell'
  shares: number
  price: number
  total: number
  timestamp: number
}

export interface UserAccount {
  username: string
  createdAt: number
  portfolio: Portfolio
}

const STOCKS_DATA: { symbol: string; name: string; sector: string; basePrice: number }[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', basePrice: 189.50 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', basePrice: 420.72 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', basePrice: 175.98 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer', basePrice: 208.30 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', basePrice: 145.89 },
  { symbol: 'META', name: 'Meta Platforms', sector: 'Technology', basePrice: 605.01 },
  { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', basePrice: 342.50 },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Finance', basePrice: 467.20 },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Finance', basePrice: 245.67 },
  { symbol: 'V', name: 'Visa Inc.', sector: 'Finance', basePrice: 298.45 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', basePrice: 155.30 },
  { symbol: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare', basePrice: 512.80 },
  { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer', basePrice: 92.15 },
  { symbol: 'PG', name: 'Procter & Gamble', sector: 'Consumer', basePrice: 168.90 },
  { symbol: 'MA', name: 'Mastercard Inc.', sector: 'Finance', basePrice: 485.30 },
  { symbol: 'HD', name: 'Home Depot', sector: 'Consumer', basePrice: 378.20 },
  { symbol: 'DIS', name: 'Walt Disney Co.', sector: 'Entertainment', basePrice: 112.45 },
  { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment', basePrice: 885.10 },
  { symbol: 'ADBE', name: 'Adobe Inc.', sector: 'Technology', basePrice: 472.60 },
  { symbol: 'CRM', name: 'Salesforce Inc.', sector: 'Technology', basePrice: 315.40 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', basePrice: 118.75 },
  { symbol: 'INTC', name: 'Intel Corp.', sector: 'Technology', basePrice: 20.45 },
  { symbol: 'PYPL', name: 'PayPal Holdings', sector: 'Finance', basePrice: 82.30 },
  { symbol: 'BA', name: 'Boeing Co.', sector: 'Industrial', basePrice: 172.90 },
  { symbol: 'NKE', name: 'Nike Inc.', sector: 'Consumer', basePrice: 71.55 },
  { symbol: 'SBUX', name: 'Starbucks Corp.', sector: 'Consumer', basePrice: 95.80 },
  { symbol: 'COST', name: 'Costco Wholesale', sector: 'Consumer', basePrice: 925.40 },
  { symbol: 'UBER', name: 'Uber Technologies', sector: 'Technology', basePrice: 78.20 },
  { symbol: 'SQ', name: 'Block Inc.', sector: 'Finance', basePrice: 82.60 },
  { symbol: 'SPOT', name: 'Spotify Technology', sector: 'Entertainment', basePrice: 610.30 },
  { symbol: 'COIN', name: 'Coinbase Global', sector: 'Finance', basePrice: 265.40 },
  { symbol: 'SNAP', name: 'Snap Inc.', sector: 'Technology', basePrice: 11.20 },
  { symbol: 'RBLX', name: 'Roblox Corp.', sector: 'Entertainment', basePrice: 68.90 },
  { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'Technology', basePrice: 115.60 },
  { symbol: 'RIVN', name: 'Rivian Automotive', sector: 'Automotive', basePrice: 13.40 },
  { symbol: 'SOFI', name: 'SoFi Technologies', sector: 'Finance', basePrice: 14.80 },
  { symbol: 'GME', name: 'GameStop Corp.', sector: 'Consumer', basePrice: 27.50 },
  { symbol: 'AMC', name: 'AMC Entertainment', sector: 'Entertainment', basePrice: 4.20 },
  { symbol: 'DKNG', name: 'DraftKings Inc.', sector: 'Entertainment', basePrice: 46.30 },
  { symbol: 'ROKU', name: 'Roku Inc.', sector: 'Technology', basePrice: 82.70 },
]

// Seeded random number generator for consistent per-stock randomness
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

// Generate initial history with DOPAMINE spikes
function generateHistory(basePrice: number, seed: number, points: number = 100): number[] {
  const rng = seededRandom(seed)
  const history: number[] = []
  let price = basePrice * (0.85 + rng() * 0.3)

  for (let i = 0; i < points; i++) {
    const spikeChance = rng()

    if (spikeChance > 0.92) {
      // MASSIVE spike up (8% chance)
      const spikeMultiplier = 1 + (rng() * 0.25 + 0.08)
      price *= spikeMultiplier
    } else if (spikeChance > 0.84) {
      // MASSIVE crash down (8% chance)
      const crashMultiplier = 1 - (rng() * 0.2 + 0.06)
      price *= crashMultiplier
    } else if (spikeChance > 0.75) {
      // Medium spike (9% chance)
      const direction = rng() > 0.5 ? 1 : -1
      price *= 1 + direction * (rng() * 0.06 + 0.02)
    } else {
      // Normal movement
      const drift = (rng() - 0.48) * 0.03
      price *= 1 + drift
    }

    // Keep price from going too crazy
    price = Math.max(price, basePrice * 0.15)
    price = Math.min(price, basePrice * 5)
    history.push(Number(price.toFixed(2)))
  }

  return history
}

// Generate the next price tick with DOPAMINE volatility
export function getNextPrice(currentPrice: number, basePrice: number): number {
  const random = Math.random()
  let newPrice = currentPrice

  if (random > 0.965) {
    // MEGA SPIKE UP (3.5% chance per tick)
    const spike = 1 + (Math.random() * 0.18 + 0.05)
    newPrice *= spike
  } else if (random > 0.93) {
    // MEGA CRASH (3.5% chance per tick)
    const crash = 1 - (Math.random() * 0.15 + 0.04)
    newPrice *= crash
  } else if (random > 0.88) {
    // Medium spike (5% chance)
    const direction = Math.random() > 0.5 ? 1 : -1
    newPrice *= 1 + direction * (Math.random() * 0.05 + 0.015)
  } else if (random > 0.78) {
    // Small spike (10% chance)
    const direction = Math.random() > 0.5 ? 1 : -1
    newPrice *= 1 + direction * (Math.random() * 0.025 + 0.005)
  } else {
    // Normal micro movement
    const drift = (Math.random() - 0.49) * 0.015
    newPrice *= 1 + drift
  }

  // Bounds
  newPrice = Math.max(newPrice, basePrice * 0.1)
  newPrice = Math.min(newPrice, basePrice * 8)

  return Number(newPrice.toFixed(2))
}

export function initializeStocks(): Stock[] {
  const now = Date.now()
  return STOCKS_DATA.map((data, index) => {
    const history = generateHistory(data.basePrice, now + index * 7919, 100)
    const currentPrice = history[history.length - 1]
    const previousPrice = history[history.length - 2]
    const change = currentPrice - previousPrice
    const changePercent = (change / previousPrice) * 100

    return {
      ...data,
      currentPrice,
      previousPrice,
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      high24h: Math.max(...history.slice(-50)),
      low24h: Math.min(...history.slice(-50)),
      volume: Math.floor(Math.random() * 50000000 + 1000000),
      marketCap: Math.floor(currentPrice * (Math.random() * 5000000000 + 500000000)),
      history,
    }
  })
}

export function tickStocks(stocks: Stock[]): Stock[] {
  return stocks.map(stock => {
    const newPrice = getNextPrice(stock.currentPrice, stock.basePrice)
    const change = newPrice - stock.currentPrice
    const changePercent = (change / stock.currentPrice) * 100
    const newHistory = [...stock.history.slice(-99), newPrice]

    return {
      ...stock,
      previousPrice: stock.currentPrice,
      currentPrice: newPrice,
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      high24h: Math.max(stock.high24h, newPrice),
      low24h: Math.min(stock.low24h, newPrice),
      volume: stock.volume + Math.floor(Math.random() * 100000),
      history: newHistory,
    }
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

export function formatNumber(num: number): string {
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
  return num.toString()
}

export function formatPercent(pct: number): string {
  const sign = pct >= 0 ? '+' : ''
  return `${sign}${pct.toFixed(2)}%`
}

// Valid invite codes
export const VALID_INVITE_CODES = ['DOPAMINE2026', 'GETRICH', 'TOTHEMOON', 'BULL', 'DIAMOND']
