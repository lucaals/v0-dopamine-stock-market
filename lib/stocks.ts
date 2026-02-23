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
  // ── US MEGA CAP TECH ──
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', basePrice: 189.50 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', basePrice: 420.72 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', basePrice: 175.98 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer', basePrice: 208.30 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', basePrice: 145.89 },
  { symbol: 'META', name: 'Meta Platforms', sector: 'Technology', basePrice: 605.01 },
  { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', basePrice: 342.50 },
  { symbol: 'AVGO', name: 'Broadcom Inc.', sector: 'Technology', basePrice: 178.42 },
  { symbol: 'ORCL', name: 'Oracle Corp.', sector: 'Technology', basePrice: 128.60 },
  { symbol: 'ADBE', name: 'Adobe Inc.', sector: 'Technology', basePrice: 472.60 },
  { symbol: 'CRM', name: 'Salesforce Inc.', sector: 'Technology', basePrice: 315.40 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', basePrice: 118.75 },
  { symbol: 'INTC', name: 'Intel Corp.', sector: 'Technology', basePrice: 20.45 },
  { symbol: 'CSCO', name: 'Cisco Systems', sector: 'Technology', basePrice: 52.30 },
  { symbol: 'IBM', name: 'IBM Corp.', sector: 'Technology', basePrice: 192.80 },
  { symbol: 'QCOM', name: 'Qualcomm Inc.', sector: 'Technology', basePrice: 168.90 },
  { symbol: 'TXN', name: 'Texas Instruments', sector: 'Technology', basePrice: 172.50 },
  { symbol: 'NOW', name: 'ServiceNow Inc.', sector: 'Technology', basePrice: 785.20 },
  { symbol: 'INTU', name: 'Intuit Inc.', sector: 'Technology', basePrice: 625.30 },
  { symbol: 'AMAT', name: 'Applied Materials', sector: 'Technology', basePrice: 195.40 },
  { symbol: 'LRCX', name: 'Lam Research', sector: 'Technology', basePrice: 920.10 },
  { symbol: 'KLAC', name: 'KLA Corp.', sector: 'Technology', basePrice: 720.80 },
  { symbol: 'SNPS', name: 'Synopsys Inc.', sector: 'Technology', basePrice: 575.60 },
  { symbol: 'CDNS', name: 'Cadence Design', sector: 'Technology', basePrice: 298.40 },
  { symbol: 'PANW', name: 'Palo Alto Networks', sector: 'Technology', basePrice: 302.70 },
  { symbol: 'CRWD', name: 'CrowdStrike Holdings', sector: 'Technology', basePrice: 348.90 },
  { symbol: 'FTNT', name: 'Fortinet Inc.', sector: 'Technology', basePrice: 78.50 },
  { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'Technology', basePrice: 115.60 },
  { symbol: 'SNOW', name: 'Snowflake Inc.', sector: 'Technology', basePrice: 192.30 },
  { symbol: 'DDOG', name: 'Datadog Inc.', sector: 'Technology', basePrice: 128.40 },
  { symbol: 'NET', name: 'Cloudflare Inc.', sector: 'Technology', basePrice: 92.10 },
  { symbol: 'WDAY', name: 'Workday Inc.', sector: 'Technology', basePrice: 268.50 },
  { symbol: 'ZS', name: 'Zscaler Inc.', sector: 'Technology', basePrice: 218.70 },
  { symbol: 'MDB', name: 'MongoDB Inc.', sector: 'Technology', basePrice: 392.10 },
  { symbol: 'TEAM', name: 'Atlassian Corp.', sector: 'Technology', basePrice: 248.60 },
  { symbol: 'HUBS', name: 'HubSpot Inc.', sector: 'Technology', basePrice: 628.40 },
  { symbol: 'VEEV', name: 'Veeva Systems', sector: 'Technology', basePrice: 198.30 },
  { symbol: 'TTD', name: 'Trade Desk Inc.', sector: 'Technology', basePrice: 88.90 },
  { symbol: 'OKTA', name: 'Okta Inc.', sector: 'Technology', basePrice: 98.40 },
  { symbol: 'TWLO', name: 'Twilio Inc.', sector: 'Technology', basePrice: 68.90 },
  // ── US FINANCE ──
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Finance', basePrice: 467.20 },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Finance', basePrice: 245.67 },
  { symbol: 'V', name: 'Visa Inc.', sector: 'Finance', basePrice: 298.45 },
  { symbol: 'MA', name: 'Mastercard Inc.', sector: 'Finance', basePrice: 485.30 },
  { symbol: 'BAC', name: 'Bank of America', sector: 'Finance', basePrice: 38.20 },
  { symbol: 'WFC', name: 'Wells Fargo', sector: 'Finance', basePrice: 58.40 },
  { symbol: 'GS', name: 'Goldman Sachs', sector: 'Finance', basePrice: 478.90 },
  { symbol: 'MS', name: 'Morgan Stanley', sector: 'Finance', basePrice: 98.70 },
  { symbol: 'C', name: 'Citigroup Inc.', sector: 'Finance', basePrice: 62.30 },
  { symbol: 'AXP', name: 'American Express', sector: 'Finance', basePrice: 248.60 },
  { symbol: 'BLK', name: 'BlackRock Inc.', sector: 'Finance', basePrice: 898.40 },
  { symbol: 'SCHW', name: 'Charles Schwab', sector: 'Finance', basePrice: 72.80 },
  { symbol: 'SPGI', name: 'S&P Global', sector: 'Finance', basePrice: 468.90 },
  { symbol: 'ICE', name: 'Intercontinental Exchange', sector: 'Finance', basePrice: 142.30 },
  { symbol: 'CME', name: 'CME Group', sector: 'Finance', basePrice: 218.50 },
  { symbol: 'MCO', name: 'Moody\'s Corp.', sector: 'Finance', basePrice: 412.70 },
  { symbol: 'COF', name: 'Capital One Financial', sector: 'Finance', basePrice: 148.20 },
  { symbol: 'USB', name: 'U.S. Bancorp', sector: 'Finance', basePrice: 44.60 },
  { symbol: 'PNC', name: 'PNC Financial', sector: 'Finance', basePrice: 168.40 },
  { symbol: 'TFC', name: 'Truist Financial', sector: 'Finance', basePrice: 38.90 },
  { symbol: 'PYPL', name: 'PayPal Holdings', sector: 'Finance', basePrice: 82.30 },
  { symbol: 'SQ', name: 'Block Inc.', sector: 'Finance', basePrice: 82.60 },
  { symbol: 'COIN', name: 'Coinbase Global', sector: 'Finance', basePrice: 265.40 },
  { symbol: 'SOFI', name: 'SoFi Technologies', sector: 'Finance', basePrice: 14.80 },
  { symbol: 'HOOD', name: 'Robinhood Markets', sector: 'Finance', basePrice: 22.40 },
  { symbol: 'AFRM', name: 'Affirm Holdings', sector: 'Finance', basePrice: 52.80 },
  // ── HEALTHCARE ──
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', basePrice: 155.30 },
  { symbol: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare', basePrice: 512.80 },
  { symbol: 'LLY', name: 'Eli Lilly & Co.', sector: 'Healthcare', basePrice: 798.40 },
  { symbol: 'NVO', name: 'Novo Nordisk', sector: 'Healthcare', basePrice: 128.90 },
  { symbol: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare', basePrice: 26.80 },
  { symbol: 'ABBV', name: 'AbbVie Inc.', sector: 'Healthcare', basePrice: 178.60 },
  { symbol: 'MRK', name: 'Merck & Co.', sector: 'Healthcare', basePrice: 128.90 },
  { symbol: 'TMO', name: 'Thermo Fisher Scientific', sector: 'Healthcare', basePrice: 568.40 },
  { symbol: 'ABT', name: 'Abbott Laboratories', sector: 'Healthcare', basePrice: 112.30 },
  { symbol: 'DHR', name: 'Danaher Corp.', sector: 'Healthcare', basePrice: 248.90 },
  { symbol: 'AMGN', name: 'Amgen Inc.', sector: 'Healthcare', basePrice: 278.40 },
  { symbol: 'BMY', name: 'Bristol-Myers Squibb', sector: 'Healthcare', basePrice: 48.90 },
  { symbol: 'GILD', name: 'Gilead Sciences', sector: 'Healthcare', basePrice: 82.40 },
  { symbol: 'VRTX', name: 'Vertex Pharmaceuticals', sector: 'Healthcare', basePrice: 428.60 },
  { symbol: 'REGN', name: 'Regeneron Pharmaceuticals', sector: 'Healthcare', basePrice: 968.40 },
  { symbol: 'ISRG', name: 'Intuitive Surgical', sector: 'Healthcare', basePrice: 398.20 },
  { symbol: 'SYK', name: 'Stryker Corp.', sector: 'Healthcare', basePrice: 338.70 },
  { symbol: 'BSX', name: 'Boston Scientific', sector: 'Healthcare', basePrice: 68.40 },
  { symbol: 'MDT', name: 'Medtronic PLC', sector: 'Healthcare', basePrice: 82.10 },
  { symbol: 'ELV', name: 'Elevance Health', sector: 'Healthcare', basePrice: 478.90 },
  { symbol: 'CI', name: 'Cigna Group', sector: 'Healthcare', basePrice: 338.60 },
  { symbol: 'HCA', name: 'HCA Healthcare', sector: 'Healthcare', basePrice: 288.40 },
  { symbol: 'ZTS', name: 'Zoetis Inc.', sector: 'Healthcare', basePrice: 178.90 },
  { symbol: 'MRNA', name: 'Moderna Inc.', sector: 'Healthcare', basePrice: 98.40 },
  { symbol: 'BIIB', name: 'Biogen Inc.', sector: 'Healthcare', basePrice: 218.60 },
  // ── CONSUMER / RETAIL ──
  { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer', basePrice: 92.15 },
  { symbol: 'PG', name: 'Procter & Gamble', sector: 'Consumer', basePrice: 168.90 },
  { symbol: 'KO', name: 'Coca-Cola Co.', sector: 'Consumer', basePrice: 62.40 },
  { symbol: 'PEP', name: 'PepsiCo Inc.', sector: 'Consumer', basePrice: 168.20 },
  { symbol: 'COST', name: 'Costco Wholesale', sector: 'Consumer', basePrice: 925.40 },
  { symbol: 'HD', name: 'Home Depot', sector: 'Consumer', basePrice: 378.20 },
  { symbol: 'NKE', name: 'Nike Inc.', sector: 'Consumer', basePrice: 71.55 },
  { symbol: 'MCD', name: 'McDonald\'s Corp.', sector: 'Consumer', basePrice: 278.40 },
  { symbol: 'SBUX', name: 'Starbucks Corp.', sector: 'Consumer', basePrice: 95.80 },
  { symbol: 'TGT', name: 'Target Corp.', sector: 'Consumer', basePrice: 142.60 },
  { symbol: 'LOW', name: 'Lowe\'s Companies', sector: 'Consumer', basePrice: 228.40 },
  { symbol: 'EL', name: 'Estee Lauder', sector: 'Consumer', basePrice: 142.80 },
  { symbol: 'CL', name: 'Colgate-Palmolive', sector: 'Consumer', basePrice: 82.40 },
  { symbol: 'KMB', name: 'Kimberly-Clark', sector: 'Consumer', basePrice: 128.90 },
  { symbol: 'GIS', name: 'General Mills', sector: 'Consumer', basePrice: 68.40 },
  { symbol: 'KHC', name: 'Kraft Heinz', sector: 'Consumer', basePrice: 34.60 },
  { symbol: 'MDLZ', name: 'Mondelez International', sector: 'Consumer', basePrice: 72.80 },
  { symbol: 'STZ', name: 'Constellation Brands', sector: 'Consumer', basePrice: 248.60 },
  { symbol: 'MO', name: 'Altria Group', sector: 'Consumer', basePrice: 42.80 },
  { symbol: 'PM', name: 'Philip Morris International', sector: 'Consumer', basePrice: 98.40 },
  { symbol: 'DEO', name: 'Diageo PLC', sector: 'Consumer', basePrice: 138.20 },
  { symbol: 'BUD', name: 'Anheuser-Busch InBev', sector: 'Consumer', basePrice: 62.40 },
  { symbol: 'UL', name: 'Unilever PLC', sector: 'Consumer', basePrice: 52.80 },
  { symbol: 'LULU', name: 'Lululemon Athletica', sector: 'Consumer', basePrice: 488.60 },
  { symbol: 'GME', name: 'GameStop Corp.', sector: 'Consumer', basePrice: 27.50 },
  { symbol: 'ROST', name: 'Ross Stores', sector: 'Consumer', basePrice: 148.20 },
  { symbol: 'TJX', name: 'TJX Companies', sector: 'Consumer', basePrice: 108.40 },
  { symbol: 'DG', name: 'Dollar General', sector: 'Consumer', basePrice: 138.60 },
  { symbol: 'DLTR', name: 'Dollar Tree', sector: 'Consumer', basePrice: 142.80 },
  { symbol: 'YUM', name: 'Yum! Brands', sector: 'Consumer', basePrice: 132.40 },
  { symbol: 'CMG', name: 'Chipotle Mexican Grill', sector: 'Consumer', basePrice: 68.20 },
  { symbol: 'DPZ', name: 'Domino\'s Pizza', sector: 'Consumer', basePrice: 428.60 },
  { symbol: 'QSR', name: 'Restaurant Brands Intl.', sector: 'Consumer', basePrice: 72.80 },
  // ── ENTERTAINMENT / MEDIA ──
  { symbol: 'DIS', name: 'Walt Disney Co.', sector: 'Entertainment', basePrice: 112.45 },
  { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment', basePrice: 885.10 },
  { symbol: 'SPOT', name: 'Spotify Technology', sector: 'Entertainment', basePrice: 610.30 },
  { symbol: 'RBLX', name: 'Roblox Corp.', sector: 'Entertainment', basePrice: 68.90 },
  { symbol: 'AMC', name: 'AMC Entertainment', sector: 'Entertainment', basePrice: 4.20 },
  { symbol: 'DKNG', name: 'DraftKings Inc.', sector: 'Entertainment', basePrice: 46.30 },
  { symbol: 'WBD', name: 'Warner Bros. Discovery', sector: 'Entertainment', basePrice: 8.40 },
  { symbol: 'PARA', name: 'Paramount Global', sector: 'Entertainment', basePrice: 12.80 },
  { symbol: 'EA', name: 'Electronic Arts', sector: 'Entertainment', basePrice: 142.60 },
  { symbol: 'TTWO', name: 'Take-Two Interactive', sector: 'Entertainment', basePrice: 168.40 },
  { symbol: 'ATVI', name: 'Activision Blizzard', sector: 'Entertainment', basePrice: 92.30 },
  { symbol: 'U', name: 'Unity Software', sector: 'Entertainment', basePrice: 28.40 },
  { symbol: 'ROKU', name: 'Roku Inc.', sector: 'Entertainment', basePrice: 82.70 },
  { symbol: 'SONY', name: 'Sony Group Corp.', sector: 'Entertainment', basePrice: 88.40 },
  { symbol: 'NTDOY', name: 'Nintendo Co.', sector: 'Entertainment', basePrice: 68.20 },
  { symbol: 'LYV', name: 'Live Nation Entertainment', sector: 'Entertainment', basePrice: 108.40 },
  { symbol: 'SIRI', name: 'Sirius XM Holdings', sector: 'Entertainment', basePrice: 22.80 },
  { symbol: 'IMAX', name: 'IMAX Corp.', sector: 'Entertainment', basePrice: 18.40 },
  // ── INDUSTRIAL / AEROSPACE / DEFENSE ──
  { symbol: 'BA', name: 'Boeing Co.', sector: 'Industrial', basePrice: 172.90 },
  { symbol: 'GE', name: 'GE Aerospace', sector: 'Industrial', basePrice: 168.40 },
  { symbol: 'HON', name: 'Honeywell International', sector: 'Industrial', basePrice: 198.60 },
  { symbol: 'CAT', name: 'Caterpillar Inc.', sector: 'Industrial', basePrice: 338.40 },
  { symbol: 'RTX', name: 'RTX Corp.', sector: 'Industrial', basePrice: 98.70 },
  { symbol: 'LMT', name: 'Lockheed Martin', sector: 'Industrial', basePrice: 458.60 },
  { symbol: 'GD', name: 'General Dynamics', sector: 'Industrial', basePrice: 278.40 },
  { symbol: 'NOC', name: 'Northrop Grumman', sector: 'Industrial', basePrice: 468.90 },
  { symbol: 'DE', name: 'Deere & Co.', sector: 'Industrial', basePrice: 398.40 },
  { symbol: 'UPS', name: 'United Parcel Service', sector: 'Industrial', basePrice: 148.60 },
  { symbol: 'FDX', name: 'FedEx Corp.', sector: 'Industrial', basePrice: 268.40 },
  { symbol: 'MMM', name: '3M Company', sector: 'Industrial', basePrice: 108.20 },
  { symbol: 'EMR', name: 'Emerson Electric', sector: 'Industrial', basePrice: 108.40 },
  { symbol: 'ETN', name: 'Eaton Corp.', sector: 'Industrial', basePrice: 278.90 },
  { symbol: 'ITW', name: 'Illinois Tool Works', sector: 'Industrial', basePrice: 258.40 },
  { symbol: 'WM', name: 'Waste Management', sector: 'Industrial', basePrice: 198.60 },
  { symbol: 'RSG', name: 'Republic Services', sector: 'Industrial', basePrice: 178.40 },
  { symbol: 'CARR', name: 'Carrier Global', sector: 'Industrial', basePrice: 58.90 },
  { symbol: 'DAL', name: 'Delta Air Lines', sector: 'Industrial', basePrice: 48.60 },
  { symbol: 'UAL', name: 'United Airlines', sector: 'Industrial', basePrice: 52.80 },
  { symbol: 'LUV', name: 'Southwest Airlines', sector: 'Industrial', basePrice: 28.40 },
  { symbol: 'AAL', name: 'American Airlines', sector: 'Industrial', basePrice: 14.60 },
  // ── ENERGY ──
  { symbol: 'XOM', name: 'Exxon Mobil', sector: 'Energy', basePrice: 108.40 },
  { symbol: 'CVX', name: 'Chevron Corp.', sector: 'Energy', basePrice: 158.60 },
  { symbol: 'COP', name: 'ConocoPhillips', sector: 'Energy', basePrice: 118.40 },
  { symbol: 'SLB', name: 'Schlumberger NV', sector: 'Energy', basePrice: 48.90 },
  { symbol: 'EOG', name: 'EOG Resources', sector: 'Energy', basePrice: 128.40 },
  { symbol: 'MPC', name: 'Marathon Petroleum', sector: 'Energy', basePrice: 168.60 },
  { symbol: 'PSX', name: 'Phillips 66', sector: 'Energy', basePrice: 138.40 },
  { symbol: 'VLO', name: 'Valero Energy', sector: 'Energy', basePrice: 142.80 },
  { symbol: 'OXY', name: 'Occidental Petroleum', sector: 'Energy', basePrice: 58.40 },
  { symbol: 'HAL', name: 'Halliburton Co.', sector: 'Energy', basePrice: 32.80 },
  { symbol: 'BKR', name: 'Baker Hughes', sector: 'Energy', basePrice: 34.60 },
  { symbol: 'FANG', name: 'Diamondback Energy', sector: 'Energy', basePrice: 158.90 },
  { symbol: 'DVN', name: 'Devon Energy', sector: 'Energy', basePrice: 42.80 },
  { symbol: 'SHEL', name: 'Shell PLC', sector: 'Energy', basePrice: 68.40 },
  { symbol: 'BP', name: 'BP PLC', sector: 'Energy', basePrice: 34.60 },
  { symbol: 'TTE', name: 'TotalEnergies SE', sector: 'Energy', basePrice: 62.80 },
  { symbol: 'EQNR', name: 'Equinor ASA', sector: 'Energy', basePrice: 26.40 },
  { symbol: 'ENB', name: 'Enbridge Inc.', sector: 'Energy', basePrice: 36.80 },
  // ── AUTOMOTIVE ──
  { symbol: 'TM', name: 'Toyota Motor Corp.', sector: 'Automotive', basePrice: 238.40 },
  { symbol: 'F', name: 'Ford Motor Co.', sector: 'Automotive', basePrice: 12.20 },
  { symbol: 'GM', name: 'General Motors', sector: 'Automotive', basePrice: 42.80 },
  { symbol: 'STLA', name: 'Stellantis NV', sector: 'Automotive', basePrice: 18.60 },
  { symbol: 'HMC', name: 'Honda Motor Co.', sector: 'Automotive', basePrice: 38.40 },
  { symbol: 'RIVN', name: 'Rivian Automotive', sector: 'Automotive', basePrice: 13.40 },
  { symbol: 'LCID', name: 'Lucid Group', sector: 'Automotive', basePrice: 4.80 },
  { symbol: 'NIO', name: 'NIO Inc.', sector: 'Automotive', basePrice: 5.60 },
  { symbol: 'XPEV', name: 'XPeng Inc.', sector: 'Automotive', basePrice: 12.40 },
  { symbol: 'LI', name: 'Li Auto Inc.', sector: 'Automotive', basePrice: 28.60 },
  { symbol: 'RACE', name: 'Ferrari NV', sector: 'Automotive', basePrice: 418.40 },
  { symbol: 'MBGAF', name: 'Mercedes-Benz Group', sector: 'Automotive', basePrice: 72.80 },
  { symbol: 'BMWYY', name: 'BMW AG', sector: 'Automotive', basePrice: 32.40 },
  { symbol: 'VWAGY', name: 'Volkswagen AG', sector: 'Automotive', basePrice: 12.80 },
  { symbol: 'POAHY', name: 'Porsche Automobil', sector: 'Automotive', basePrice: 4.80 },
  { symbol: 'HYMTF', name: 'Hyundai Motor Co.', sector: 'Automotive', basePrice: 48.60 },
  // ── TELECOM ──
  { symbol: 'T', name: 'AT&T Inc.', sector: 'Telecom', basePrice: 18.40 },
  { symbol: 'VZ', name: 'Verizon Communications', sector: 'Telecom', basePrice: 38.60 },
  { symbol: 'TMUS', name: 'T-Mobile US', sector: 'Telecom', basePrice: 168.40 },
  { symbol: 'CMCSA', name: 'Comcast Corp.', sector: 'Telecom', basePrice: 42.80 },
  { symbol: 'CHTR', name: 'Charter Communications', sector: 'Telecom', basePrice: 378.60 },
  { symbol: 'AMX', name: 'America Movil', sector: 'Telecom', basePrice: 18.40 },
  { symbol: 'VOD', name: 'Vodafone Group', sector: 'Telecom', basePrice: 8.60 },
  { symbol: 'DTEGY', name: 'Deutsche Telekom', sector: 'Telecom', basePrice: 28.40 },
  { symbol: 'ORAN', name: 'Orange SA', sector: 'Telecom', basePrice: 12.80 },
  { symbol: 'TEF', name: 'Telefonica SA', sector: 'Telecom', basePrice: 4.20 },
  // ── REAL ESTATE ──
  { symbol: 'PLD', name: 'Prologis Inc.', sector: 'Real Estate', basePrice: 128.40 },
  { symbol: 'AMT', name: 'American Tower Corp.', sector: 'Real Estate', basePrice: 198.60 },
  { symbol: 'CCI', name: 'Crown Castle Intl.', sector: 'Real Estate', basePrice: 108.40 },
  { symbol: 'EQIX', name: 'Equinix Inc.', sector: 'Real Estate', basePrice: 848.60 },
  { symbol: 'SPG', name: 'Simon Property Group', sector: 'Real Estate', basePrice: 158.40 },
  { symbol: 'PSA', name: 'Public Storage', sector: 'Real Estate', basePrice: 298.60 },
  { symbol: 'O', name: 'Realty Income Corp.', sector: 'Real Estate', basePrice: 52.80 },
  { symbol: 'DLR', name: 'Digital Realty Trust', sector: 'Real Estate', basePrice: 148.40 },
  { symbol: 'WELL', name: 'Welltower Inc.', sector: 'Real Estate', basePrice: 98.60 },
  { symbol: 'AVB', name: 'AvalonBay Communities', sector: 'Real Estate', basePrice: 198.40 },
  // ── MATERIALS / MINING ──
  { symbol: 'LIN', name: 'Linde PLC', sector: 'Materials', basePrice: 428.60 },
  { symbol: 'APD', name: 'Air Products & Chemicals', sector: 'Materials', basePrice: 248.40 },
  { symbol: 'SHW', name: 'Sherwin-Williams', sector: 'Materials', basePrice: 348.60 },
  { symbol: 'ECL', name: 'Ecolab Inc.', sector: 'Materials', basePrice: 218.40 },
  { symbol: 'FCX', name: 'Freeport-McMoRan', sector: 'Materials', basePrice: 42.80 },
  { symbol: 'NEM', name: 'Newmont Corp.', sector: 'Materials', basePrice: 42.60 },
  { symbol: 'NUE', name: 'Nucor Corp.', sector: 'Materials', basePrice: 178.40 },
  { symbol: 'BHP', name: 'BHP Group Ltd.', sector: 'Materials', basePrice: 58.60 },
  { symbol: 'RIO', name: 'Rio Tinto PLC', sector: 'Materials', basePrice: 68.40 },
  { symbol: 'VALE', name: 'Vale SA', sector: 'Materials', basePrice: 12.80 },
  { symbol: 'GOLD', name: 'Barrick Gold Corp.', sector: 'Materials', basePrice: 18.40 },
  { symbol: 'AA', name: 'Alcoa Corp.', sector: 'Materials', basePrice: 28.60 },
  // ── UTILITIES ──
  { symbol: 'NEE', name: 'NextEra Energy', sector: 'Utilities', basePrice: 68.40 },
  { symbol: 'DUK', name: 'Duke Energy', sector: 'Utilities', basePrice: 98.60 },
  { symbol: 'SO', name: 'Southern Company', sector: 'Utilities', basePrice: 72.80 },
  { symbol: 'D', name: 'Dominion Energy', sector: 'Utilities', basePrice: 48.40 },
  { symbol: 'AEP', name: 'American Electric Power', sector: 'Utilities', basePrice: 88.60 },
  { symbol: 'EXC', name: 'Exelon Corp.', sector: 'Utilities', basePrice: 38.40 },
  { symbol: 'SRE', name: 'Sempra Energy', sector: 'Utilities', basePrice: 78.60 },
  { symbol: 'XEL', name: 'Xcel Energy', sector: 'Utilities', basePrice: 62.40 },
  { symbol: 'ED', name: 'Consolidated Edison', sector: 'Utilities', basePrice: 98.80 },
  { symbol: 'WEC', name: 'WEC Energy Group', sector: 'Utilities', basePrice: 88.40 },
  // ── TRANSPORT / LOGISTICS ──
  { symbol: 'UBER', name: 'Uber Technologies', sector: 'Transport', basePrice: 78.20 },
  { symbol: 'LYFT', name: 'Lyft Inc.', sector: 'Transport', basePrice: 18.40 },
  { symbol: 'GRAB', name: 'Grab Holdings', sector: 'Transport', basePrice: 3.80 },
  { symbol: 'ABNB', name: 'Airbnb Inc.', sector: 'Transport', basePrice: 158.60 },
  { symbol: 'BKNG', name: 'Booking Holdings', sector: 'Transport', basePrice: 3948.60 },
  { symbol: 'EXPE', name: 'Expedia Group', sector: 'Transport', basePrice: 158.40 },
  { symbol: 'MAR', name: 'Marriott International', sector: 'Transport', basePrice: 248.60 },
  { symbol: 'HLT', name: 'Hilton Worldwide', sector: 'Transport', basePrice: 218.40 },
  { symbol: 'CNI', name: 'Canadian National Railway', sector: 'Transport', basePrice: 118.60 },
  { symbol: 'CP', name: 'Canadian Pacific Kansas City', sector: 'Transport', basePrice: 78.40 },
  { symbol: 'UNP', name: 'Union Pacific', sector: 'Transport', basePrice: 248.60 },
  { symbol: 'NSC', name: 'Norfolk Southern', sector: 'Transport', basePrice: 238.40 },
  // ── CHINA TECH & MAJOR ──
  { symbol: 'BABA', name: 'Alibaba Group', sector: 'China', basePrice: 78.40 },
  { symbol: 'JD', name: 'JD.com Inc.', sector: 'China', basePrice: 28.60 },
  { symbol: 'PDD', name: 'PDD Holdings (Temu)', sector: 'China', basePrice: 132.80 },
  { symbol: 'BIDU', name: 'Baidu Inc.', sector: 'China', basePrice: 102.40 },
  { symbol: 'TCEHY', name: 'Tencent Holdings', sector: 'China', basePrice: 42.80 },
  { symbol: 'NTES', name: 'NetEase Inc.', sector: 'China', basePrice: 98.60 },
  { symbol: 'BEKE', name: 'KE Holdings', sector: 'China', basePrice: 18.40 },
  { symbol: 'BILI', name: 'Bilibili Inc.', sector: 'China', basePrice: 12.80 },
  { symbol: 'TME', name: 'Tencent Music', sector: 'China', basePrice: 12.40 },
  { symbol: 'ZTO', name: 'ZTO Express', sector: 'China', basePrice: 22.80 },
  { symbol: 'TAL', name: 'TAL Education', sector: 'China', basePrice: 12.60 },
  { symbol: 'MNSO', name: 'MINISO Group', sector: 'China', basePrice: 22.40 },
  { symbol: 'YUMC', name: 'Yum China Holdings', sector: 'China', basePrice: 42.80 },
  { symbol: 'WB', name: 'Weibo Corp.', sector: 'China', basePrice: 8.60 },
  { symbol: 'IQ', name: 'iQIYI Inc.', sector: 'China', basePrice: 4.20 },
  // ── JAPAN ──
  { symbol: 'SMFG', name: 'Sumitomo Mitsui Financial', sector: 'Japan', basePrice: 12.80 },
  { symbol: 'MUFG', name: 'Mitsubishi UFJ Financial', sector: 'Japan', basePrice: 10.40 },
  { symbol: 'MFG', name: 'Mizuho Financial Group', sector: 'Japan', basePrice: 4.20 },
  { symbol: 'SFTBY', name: 'SoftBank Group', sector: 'Japan', basePrice: 28.40 },
  { symbol: 'SNE', name: 'Sony Group Corp. (ADR)', sector: 'Japan', basePrice: 88.60 },
  { symbol: 'FANUY', name: 'FANUC Corp.', sector: 'Japan', basePrice: 28.40 },
  { symbol: 'KDDIY', name: 'KDDI Corp.', sector: 'Japan', basePrice: 18.60 },
  { symbol: 'DSCSY', name: 'Disco Corp.', sector: 'Japan', basePrice: 38.40 },
  { symbol: 'NPPXF', name: 'Nippon Express', sector: 'Japan', basePrice: 52.80 },
  { symbol: 'TOELY', name: 'Tokyo Electron', sector: 'Japan', basePrice: 82.40 },
  // ── KOREA ──
  { symbol: 'SSNLF', name: 'Samsung Electronics', sector: 'Korea', basePrice: 42.80 },
  { symbol: 'SKM', name: 'SK Telecom', sector: 'Korea', basePrice: 22.40 },
  { symbol: 'LPL', name: 'LG Display', sector: 'Korea', basePrice: 4.80 },
  { symbol: 'KB', name: 'KB Financial Group', sector: 'Korea', basePrice: 48.60 },
  { symbol: 'SHG', name: 'Shinhan Financial', sector: 'Korea', basePrice: 32.80 },
  // ── INDIA ──
  { symbol: 'INFY', name: 'Infosys Ltd.', sector: 'India', basePrice: 18.40 },
  { symbol: 'WIT', name: 'Wipro Ltd.', sector: 'India', basePrice: 5.80 },
  { symbol: 'HDB', name: 'HDFC Bank Ltd.', sector: 'India', basePrice: 62.80 },
  { symbol: 'IBN', name: 'ICICI Bank Ltd.', sector: 'India', basePrice: 28.40 },
  { symbol: 'RDY', name: 'Dr. Reddy\'s Laboratories', sector: 'India', basePrice: 68.60 },
  { symbol: 'TTM', name: 'Tata Motors Ltd.', sector: 'India', basePrice: 28.40 },
  { symbol: 'SIFY', name: 'Sify Technologies', sector: 'India', basePrice: 1.20 },
  { symbol: 'WNS', name: 'WNS Holdings', sector: 'India', basePrice: 58.40 },
  { symbol: 'VEDL', name: 'Vedanta Ltd.', sector: 'India', basePrice: 22.80 },
  { symbol: 'RELX', name: 'Reliance Industries (ADR)', sector: 'India', basePrice: 32.40 },
  // ── EUROPE ──
  { symbol: 'ASML', name: 'ASML Holding NV', sector: 'Europe', basePrice: 928.40 },
  { symbol: 'SAP', name: 'SAP SE', sector: 'Europe', basePrice: 218.60 },
  { symbol: 'NESN', name: 'Nestle SA', sector: 'Europe', basePrice: 98.40 },
  { symbol: 'LVMUY', name: 'LVMH Moet Hennessy', sector: 'Europe', basePrice: 168.60 },
  { symbol: 'NVS', name: 'Novartis AG', sector: 'Europe', basePrice: 108.40 },
  { symbol: 'ROG', name: 'Roche Holding AG', sector: 'Europe', basePrice: 248.60 },
  { symbol: 'AZN', name: 'AstraZeneca PLC', sector: 'Europe', basePrice: 68.40 },
  { symbol: 'GSK', name: 'GSK PLC', sector: 'Europe', basePrice: 38.60 },
  { symbol: 'SNY', name: 'Sanofi SA', sector: 'Europe', basePrice: 48.40 },
  { symbol: 'SIE', name: 'Siemens AG', sector: 'Europe', basePrice: 198.60 },
  { symbol: 'AIR', name: 'Airbus SE', sector: 'Europe', basePrice: 158.40 },
  { symbol: 'OR', name: 'L\'Oreal SA', sector: 'Europe', basePrice: 428.60 },
  { symbol: 'HSBC', name: 'HSBC Holdings PLC', sector: 'Europe', basePrice: 42.80 },
  { symbol: 'BCS', name: 'Barclays PLC', sector: 'Europe', basePrice: 12.40 },
  { symbol: 'UBS', name: 'UBS Group AG', sector: 'Europe', basePrice: 32.80 },
  { symbol: 'DB', name: 'Deutsche Bank', sector: 'Europe', basePrice: 14.60 },
  { symbol: 'CS', name: 'Credit Suisse (Legacy)', sector: 'Europe', basePrice: 2.80 },
  { symbol: 'ING', name: 'ING Groep NV', sector: 'Europe', basePrice: 16.40 },
  { symbol: 'SAN', name: 'Banco Santander', sector: 'Europe', basePrice: 4.20 },
  { symbol: 'BBVA', name: 'Banco Bilbao Vizcaya', sector: 'Europe', basePrice: 9.80 },
  { symbol: 'EADSY', name: 'Airbus (OTC)', sector: 'Europe', basePrice: 38.40 },
  { symbol: 'RHHBY', name: 'Roche (OTC)', sector: 'Europe', basePrice: 38.60 },
  { symbol: 'DSNKY', name: 'Dassault Systemes', sector: 'Europe', basePrice: 38.40 },
  { symbol: 'SPOT.EU', name: 'Spotify (EU listing)', sector: 'Europe', basePrice: 318.40 },
  { symbol: 'ADYEN', name: 'Adyen NV', sector: 'Europe', basePrice: 1428.60 },
  { symbol: 'SHOP', name: 'Shopify Inc.', sector: 'Europe', basePrice: 78.40 },
  // ── LATIN AMERICA ──
  { symbol: 'NU', name: 'Nu Holdings (Nubank)', sector: 'LatAm', basePrice: 12.40 },
  { symbol: 'MELI', name: 'MercadoLibre Inc.', sector: 'LatAm', basePrice: 1768.60 },
  { symbol: 'PBR', name: 'Petrobras SA', sector: 'LatAm', basePrice: 14.80 },
  { symbol: 'ITUB', name: 'Itau Unibanco', sector: 'LatAm', basePrice: 6.80 },
  { symbol: 'BBD', name: 'Banco Bradesco', sector: 'LatAm', basePrice: 2.80 },
  { symbol: 'ABEV', name: 'Ambev SA', sector: 'LatAm', basePrice: 2.40 },
  { symbol: 'SBS', name: 'SABESP', sector: 'LatAm', basePrice: 18.60 },
  { symbol: 'XP', name: 'XP Inc.', sector: 'LatAm', basePrice: 22.80 },
  { symbol: 'STNE', name: 'StoneCo Ltd.', sector: 'LatAm', basePrice: 18.40 },
  { symbol: 'PAGS', name: 'PagSeguro Digital', sector: 'LatAm', basePrice: 12.60 },
  // ── AUSTRALIA ──
  { symbol: 'CBA', name: 'Commonwealth Bank', sector: 'Australia', basePrice: 98.40 },
  { symbol: 'CSL', name: 'CSL Ltd.', sector: 'Australia', basePrice: 218.60 },
  { symbol: 'WES', name: 'Wesfarmers Ltd.', sector: 'Australia', basePrice: 48.40 },
  { symbol: 'NAB', name: 'National Australia Bank', sector: 'Australia', basePrice: 28.60 },
  { symbol: 'ANZ', name: 'ANZ Group Holdings', sector: 'Australia', basePrice: 22.80 },
  { symbol: 'WOW', name: 'Woolworths Group', sector: 'Australia', basePrice: 28.40 },
  { symbol: 'TLS', name: 'Telstra Group', sector: 'Australia', basePrice: 3.40 },
  { symbol: 'FMG', name: 'Fortescue Metals', sector: 'Australia', basePrice: 18.60 },
  // ── MIDDLE EAST / AFRICA ──
  { symbol: 'ARMCO', name: 'Saudi Aramco', sector: 'Middle East', basePrice: 8.80 },
  { symbol: 'STC', name: 'Saudi Telecom', sector: 'Middle East', basePrice: 12.40 },
  { symbol: 'ETISALAT', name: 'Emirates Telecom (e&)', sector: 'Middle East', basePrice: 4.80 },
  { symbol: 'QNB', name: 'Qatar National Bank', sector: 'Middle East', basePrice: 4.20 },
  { symbol: 'FAB', name: 'First Abu Dhabi Bank', sector: 'Middle East', basePrice: 4.60 },
  { symbol: 'NASTY', name: 'Naspers Ltd.', sector: 'Africa', basePrice: 178.40 },
  { symbol: 'SBSW', name: 'Sibanye Stillwater', sector: 'Africa', basePrice: 4.80 },
  { symbol: 'GFI', name: 'Gold Fields Ltd.', sector: 'Africa', basePrice: 18.40 },
  { symbol: 'ANGPY', name: 'Anglo American', sector: 'Africa', basePrice: 22.60 },
  { symbol: 'SBLK', name: 'Star Bulk Carriers', sector: 'Africa', basePrice: 18.80 },
  // ── SEMICONDUCTOR ──
  { symbol: 'TSM', name: 'Taiwan Semiconductor', sector: 'Semiconductor', basePrice: 178.40 },
  { symbol: 'MU', name: 'Micron Technology', sector: 'Semiconductor', basePrice: 88.60 },
  { symbol: 'MRVL', name: 'Marvell Technology', sector: 'Semiconductor', basePrice: 78.40 },
  { symbol: 'ON', name: 'ON Semiconductor', sector: 'Semiconductor', basePrice: 68.60 },
  { symbol: 'ADI', name: 'Analog Devices', sector: 'Semiconductor', basePrice: 198.40 },
  { symbol: 'NXPI', name: 'NXP Semiconductors', sector: 'Semiconductor', basePrice: 228.60 },
  { symbol: 'SWKS', name: 'Skyworks Solutions', sector: 'Semiconductor', basePrice: 98.40 },
  { symbol: 'MPWR', name: 'Monolithic Power Systems', sector: 'Semiconductor', basePrice: 648.60 },
  { symbol: 'ARM', name: 'Arm Holdings PLC', sector: 'Semiconductor', basePrice: 148.40 },
  { symbol: 'GFS', name: 'GlobalFoundries', sector: 'Semiconductor', basePrice: 52.80 },
  // ── CYBERSECURITY / SOFTWARE ──
  { symbol: 'S', name: 'SentinelOne Inc.', sector: 'Cybersecurity', basePrice: 28.40 },
  { symbol: 'CYBR', name: 'CyberArk Software', sector: 'Cybersecurity', basePrice: 268.60 },
  { symbol: 'RPD', name: 'Rapid7 Inc.', sector: 'Cybersecurity', basePrice: 48.40 },
  { symbol: 'TENB', name: 'Tenable Holdings', sector: 'Cybersecurity', basePrice: 42.80 },
  { symbol: 'QLYS', name: 'Qualys Inc.', sector: 'Cybersecurity', basePrice: 158.60 },
  { symbol: 'VRNS', name: 'Varonis Systems', sector: 'Cybersecurity', basePrice: 48.40 },
  // ── E-COMMERCE / INTERNET ──
  { symbol: 'SE', name: 'Sea Ltd.', sector: 'E-Commerce', basePrice: 42.80 },
  { symbol: 'CPNG', name: 'Coupang Inc.', sector: 'E-Commerce', basePrice: 18.60 },
  { symbol: 'GLBE', name: 'Global-e Online', sector: 'E-Commerce', basePrice: 38.40 },
  { symbol: 'ETSY', name: 'Etsy Inc.', sector: 'E-Commerce', basePrice: 68.60 },
  { symbol: 'W', name: 'Wayfair Inc.', sector: 'E-Commerce', basePrice: 58.40 },
  { symbol: 'CHWY', name: 'Chewy Inc.', sector: 'E-Commerce', basePrice: 22.80 },
  { symbol: 'PINS', name: 'Pinterest Inc.', sector: 'E-Commerce', basePrice: 32.40 },
  { symbol: 'SNAP', name: 'Snap Inc.', sector: 'E-Commerce', basePrice: 11.20 },
  { symbol: 'MTCH', name: 'Match Group', sector: 'E-Commerce', basePrice: 38.60 },
  { symbol: 'BMBL', name: 'Bumble Inc.', sector: 'E-Commerce', basePrice: 12.40 },
  // ── CLOUD / AI / DATA ──
  { symbol: 'PATH', name: 'UiPath Inc.', sector: 'AI & Cloud', basePrice: 18.60 },
  { symbol: 'AI', name: 'C3.ai Inc.', sector: 'AI & Cloud', basePrice: 32.80 },
  { symbol: 'BBAI', name: 'BigBear.ai Holdings', sector: 'AI & Cloud', basePrice: 2.80 },
  { symbol: 'SOUN', name: 'SoundHound AI', sector: 'AI & Cloud', basePrice: 8.40 },
  { symbol: 'UPST', name: 'Upstart Holdings', sector: 'AI & Cloud', basePrice: 38.60 },
  { symbol: 'DOCN', name: 'DigitalOcean Holdings', sector: 'AI & Cloud', basePrice: 38.40 },
  { symbol: 'ESTC', name: 'Elastic NV', sector: 'AI & Cloud', basePrice: 118.60 },
  { symbol: 'CFLT', name: 'Confluent Inc.', sector: 'AI & Cloud', basePrice: 28.40 },
  { symbol: 'SUMO', name: 'Sumo Logic (Legacy)', sector: 'AI & Cloud', basePrice: 12.80 },
  { symbol: 'DT', name: 'Dynatrace Inc.', sector: 'AI & Cloud', basePrice: 52.40 },
  // ── BIOTECH VOLATILE (DOPAMINE SPECIALS) ──
  { symbol: 'NVAX', name: 'Novavax Inc.', sector: 'Biotech', basePrice: 8.40 },
  { symbol: 'SAVA', name: 'Cassava Sciences', sector: 'Biotech', basePrice: 28.60 },
  { symbol: 'SRPT', name: 'Sarepta Therapeutics', sector: 'Biotech', basePrice: 128.40 },
  { symbol: 'CRSP', name: 'CRISPR Therapeutics', sector: 'Biotech', basePrice: 58.60 },
  { symbol: 'EDIT', name: 'Editas Medicine', sector: 'Biotech', basePrice: 8.40 },
  { symbol: 'NTLA', name: 'Intellia Therapeutics', sector: 'Biotech', basePrice: 28.60 },
  { symbol: 'BEAM', name: 'Beam Therapeutics', sector: 'Biotech', basePrice: 28.40 },
  { symbol: 'ARKG.X', name: 'ARK Genomic (ETF-like)', sector: 'Biotech', basePrice: 28.60 },
  { symbol: 'FATE', name: 'Fate Therapeutics', sector: 'Biotech', basePrice: 2.80 },
  { symbol: 'KRTX', name: 'Karuna Therapeutics', sector: 'Biotech', basePrice: 318.40 },
  // ── CRYPTO-ADJACENT / FINTECH ──
  { symbol: 'MSTR', name: 'MicroStrategy Inc.', sector: 'Crypto', basePrice: 1882.40 },
  { symbol: 'MARA', name: 'Marathon Digital', sector: 'Crypto', basePrice: 22.80 },
  { symbol: 'RIOT', name: 'Riot Platforms', sector: 'Crypto', basePrice: 12.40 },
  { symbol: 'CLSK', name: 'CleanSpark Inc.', sector: 'Crypto', basePrice: 18.60 },
  { symbol: 'HIVE', name: 'HIVE Blockchain', sector: 'Crypto', basePrice: 3.40 },
  { symbol: 'BITF', name: 'Bitfarms Ltd.', sector: 'Crypto', basePrice: 2.80 },
  { symbol: 'HUT', name: 'Hut 8 Mining', sector: 'Crypto', basePrice: 12.40 },
  { symbol: 'CIFR', name: 'Cipher Mining', sector: 'Crypto', basePrice: 4.80 },
  // ── SPACE / DEFENSE TECH ──
  { symbol: 'RKLB', name: 'Rocket Lab USA', sector: 'Space', basePrice: 18.40 },
  { symbol: 'ASTR', name: 'Astra Space', sector: 'Space', basePrice: 1.20 },
  { symbol: 'ASTS', name: 'AST SpaceMobile', sector: 'Space', basePrice: 28.60 },
  { symbol: 'SPCE', name: 'Virgin Galactic', sector: 'Space', basePrice: 2.40 },
  { symbol: 'LUNR', name: 'Intuitive Machines', sector: 'Space', basePrice: 12.80 },
  { symbol: 'MNTS', name: 'Momentus Inc.', sector: 'Space', basePrice: 4.60 },
  { symbol: 'RDW', name: 'Redwire Corp.', sector: 'Space', basePrice: 8.40 },
  // ── CANNABIS ──
  { symbol: 'TLRY', name: 'Tilray Brands', sector: 'Cannabis', basePrice: 2.20 },
  { symbol: 'CGC', name: 'Canopy Growth', sector: 'Cannabis', basePrice: 4.80 },
  { symbol: 'ACB', name: 'Aurora Cannabis', sector: 'Cannabis', basePrice: 4.20 },
  { symbol: 'SNDL', name: 'SNDL Inc.', sector: 'Cannabis', basePrice: 1.80 },
  { symbol: 'CURLF', name: 'Curaleaf Holdings', sector: 'Cannabis', basePrice: 3.60 },
  { symbol: 'GTBIF', name: 'Green Thumb Industries', sector: 'Cannabis', basePrice: 12.40 },
  // ── CLEAN ENERGY / EV INFRA ──
  { symbol: 'ENPH', name: 'Enphase Energy', sector: 'Clean Energy', basePrice: 108.40 },
  { symbol: 'SEDG', name: 'SolarEdge Technologies', sector: 'Clean Energy', basePrice: 68.60 },
  { symbol: 'FSLR', name: 'First Solar Inc.', sector: 'Clean Energy', basePrice: 178.40 },
  { symbol: 'RUN', name: 'Sunrun Inc.', sector: 'Clean Energy', basePrice: 18.60 },
  { symbol: 'PLUG', name: 'Plug Power Inc.', sector: 'Clean Energy', basePrice: 4.80 },
  { symbol: 'BE', name: 'Bloom Energy', sector: 'Clean Energy', basePrice: 18.40 },
  { symbol: 'CHPT', name: 'ChargePoint Holdings', sector: 'Clean Energy', basePrice: 1.80 },
  { symbol: 'BLNK', name: 'Blink Charging', sector: 'Clean Energy', basePrice: 2.80 },
  { symbol: 'QS', name: 'QuantumScape Corp.', sector: 'Clean Energy', basePrice: 6.40 },
  { symbol: 'STEM', name: 'Stem Inc.', sector: 'Clean Energy', basePrice: 1.20 },
  // ── FOOD / AGRICULTURE ──
  { symbol: 'ADM', name: 'Archer-Daniels-Midland', sector: 'Agriculture', basePrice: 58.40 },
  { symbol: 'BG', name: 'Bunge Global SA', sector: 'Agriculture', basePrice: 98.60 },
  { symbol: 'CTVA', name: 'Corteva Agriscience', sector: 'Agriculture', basePrice: 52.40 },
  { symbol: 'DE', name: 'Deere & Company', sector: 'Agriculture', basePrice: 398.40 },
  { symbol: 'FMC', name: 'FMC Corp.', sector: 'Agriculture', basePrice: 58.60 },
  { symbol: 'BYND', name: 'Beyond Meat', sector: 'Agriculture', basePrice: 8.40 },
  { symbol: 'OTLY', name: 'Oatly Group', sector: 'Agriculture', basePrice: 1.20 },
  { symbol: 'TTCF', name: 'Tattooed Chef', sector: 'Agriculture', basePrice: 0.40 },
  // ── MISC / MEME / VOLATILE ──
  { symbol: 'DWAC', name: 'Trump Media & Tech', sector: 'Meme', basePrice: 42.80 },
  { symbol: 'BB', name: 'BlackBerry Ltd.', sector: 'Meme', basePrice: 2.80 },
  { symbol: 'NOK', name: 'Nokia Oyj', sector: 'Meme', basePrice: 3.60 },
  { symbol: 'BBBY', name: 'Bed Bath & Beyond (Legacy)', sector: 'Meme', basePrice: 0.20 },
  { symbol: 'WISH', name: 'ContextLogic (Wish)', sector: 'Meme', basePrice: 4.80 },
  { symbol: 'CLOV', name: 'Clover Health', sector: 'Meme', basePrice: 1.20 },
  { symbol: 'WKHS', name: 'Workhorse Group', sector: 'Meme', basePrice: 0.80 },
  { symbol: 'GOEV', name: 'Canoo Inc.', sector: 'Meme', basePrice: 0.40 },
  { symbol: 'IRNT', name: 'IronNet Cybersecurity', sector: 'Meme', basePrice: 1.60 },
  { symbol: 'SKLZ', name: 'Skillz Inc.', sector: 'Meme', basePrice: 6.80 },
  // ── ADDITIONAL GLOBAL LARGE CAPS ──
  { symbol: 'RY', name: 'Royal Bank of Canada', sector: 'Finance', basePrice: 118.40 },
  { symbol: 'TD', name: 'Toronto-Dominion Bank', sector: 'Finance', basePrice: 58.60 },
  { symbol: 'BNS', name: 'Bank of Nova Scotia', sector: 'Finance', basePrice: 48.40 },
  { symbol: 'BMO', name: 'Bank of Montreal', sector: 'Finance', basePrice: 98.60 },
  { symbol: 'MFC', name: 'Manulife Financial', sector: 'Finance', basePrice: 22.80 },
  { symbol: 'SLF', name: 'Sun Life Financial', sector: 'Finance', basePrice: 52.40 },
  { symbol: 'ABB', name: 'ABB Ltd.', sector: 'Industrial', basePrice: 48.60 },
  { symbol: 'RELX.L', name: 'RELX PLC', sector: 'Europe', basePrice: 38.40 },
  { symbol: 'DSM', name: 'DSM-Firmenich AG', sector: 'Europe', basePrice: 108.60 },
  { symbol: 'EXPN', name: 'Experian PLC', sector: 'Europe', basePrice: 42.80 },
  { symbol: 'LSEG', name: 'London Stock Exchange', sector: 'Europe', basePrice: 118.40 },
  { symbol: 'MCK', name: 'McKesson Corp.', sector: 'Healthcare', basePrice: 548.60 },
  { symbol: 'CAH', name: 'Cardinal Health', sector: 'Healthcare', basePrice: 118.40 },
  { symbol: 'ABC', name: 'AmerisourceBergen', sector: 'Healthcare', basePrice: 218.60 },
  { symbol: 'CLX', name: 'Clorox Company', sector: 'Consumer', basePrice: 148.40 },
  { symbol: 'CHD', name: 'Church & Dwight', sector: 'Consumer', basePrice: 98.60 },
  { symbol: 'HSY', name: 'Hershey Company', sector: 'Consumer', basePrice: 188.40 },
  { symbol: 'K', name: 'Kellanova', sector: 'Consumer', basePrice: 58.60 },
  { symbol: 'SJM', name: 'J.M. Smucker', sector: 'Consumer', basePrice: 128.40 },
  { symbol: 'CPB', name: 'Campbell Soup', sector: 'Consumer', basePrice: 42.80 },
  { symbol: 'BF.B', name: 'Brown-Forman Corp.', sector: 'Consumer', basePrice: 58.60 },
  { symbol: 'TAP', name: 'Molson Coors', sector: 'Consumer', basePrice: 62.40 },
  { symbol: 'SAM', name: 'Boston Beer Co.', sector: 'Consumer', basePrice: 328.60 },
  { symbol: 'MNST', name: 'Monster Beverage', sector: 'Consumer', basePrice: 52.80 },
  { symbol: 'CELH', name: 'Celsius Holdings', sector: 'Consumer', basePrice: 52.40 },
  { symbol: 'GPRO', name: 'GoPro Inc.', sector: 'Consumer', basePrice: 2.80 },
  { symbol: 'PTON', name: 'Peloton Interactive', sector: 'Consumer', basePrice: 4.80 },
  { symbol: 'CROX', name: 'Crocs Inc.', sector: 'Consumer', basePrice: 118.40 },
  { symbol: 'DECK', name: 'Deckers Outdoor', sector: 'Consumer', basePrice: 708.60 },
  { symbol: 'ONON', name: 'On Holding AG', sector: 'Consumer', basePrice: 38.40 },
  { symbol: 'BIRK', name: 'Birkenstock Holding', sector: 'Consumer', basePrice: 52.80 },
  // ── INSURANCE ──
  { symbol: 'PGR', name: 'Progressive Corp.', sector: 'Insurance', basePrice: 208.60 },
  { symbol: 'ALL', name: 'Allstate Corp.', sector: 'Insurance', basePrice: 168.40 },
  { symbol: 'MET', name: 'MetLife Inc.', sector: 'Insurance', basePrice: 72.80 },
  { symbol: 'PRU', name: 'Prudential Financial', sector: 'Insurance', basePrice: 108.60 },
  { symbol: 'AIG', name: 'American Intl. Group', sector: 'Insurance', basePrice: 72.40 },
  { symbol: 'AFL', name: 'Aflac Inc.', sector: 'Insurance', basePrice: 82.80 },
  { symbol: 'TRV', name: 'Travelers Companies', sector: 'Insurance', basePrice: 218.60 },
  { symbol: 'CB', name: 'Chubb Ltd.', sector: 'Insurance', basePrice: 258.40 },
  // ── ADDITIONAL FILLER TO 500 ──
  { symbol: 'DOCS', name: 'Doximity Inc.', sector: 'Healthcare', basePrice: 28.40 },
  { symbol: 'DXCM', name: 'DexCom Inc.', sector: 'Healthcare', basePrice: 118.60 },
  { symbol: 'ALGN', name: 'Align Technology', sector: 'Healthcare', basePrice: 248.40 },
  { symbol: 'PODD', name: 'Insulet Corp.', sector: 'Healthcare', basePrice: 178.60 },
  { symbol: 'HZNP', name: 'Horizon Therapeutics', sector: 'Healthcare', basePrice: 108.40 },
  { symbol: 'AXON', name: 'Axon Enterprise', sector: 'Industrial', basePrice: 248.60 },
  { symbol: 'TDG', name: 'TransDigm Group', sector: 'Industrial', basePrice: 1148.40 },
  { symbol: 'PCAR', name: 'PACCAR Inc.', sector: 'Industrial', basePrice: 98.60 },
  { symbol: 'GWW', name: 'W.W. Grainger', sector: 'Industrial', basePrice: 928.40 },
  { symbol: 'PWR', name: 'Quanta Services', sector: 'Industrial', basePrice: 218.60 },
  { symbol: 'FAST', name: 'Fastenal Company', sector: 'Industrial', basePrice: 68.40 },
  { symbol: 'ODFL', name: 'Old Dominion Freight', sector: 'Industrial', basePrice: 198.60 },
  { symbol: 'J', name: 'Jacobs Solutions', sector: 'Industrial', basePrice: 138.40 },
  { symbol: 'DOV', name: 'Dover Corp.', sector: 'Industrial', basePrice: 158.60 },
  { symbol: 'AME', name: 'AMETEK Inc.', sector: 'Industrial', basePrice: 178.40 },
  { symbol: 'FIS', name: 'Fidelity Natl. Info.', sector: 'Finance', basePrice: 68.60 },
  { symbol: 'FISV', name: 'Fiserv Inc.', sector: 'Finance', basePrice: 158.40 },
  { symbol: 'GPN', name: 'Global Payments', sector: 'Finance', basePrice: 128.60 },
  { symbol: 'WBK', name: 'Westpac Banking', sector: 'Australia', basePrice: 18.40 },
  { symbol: 'SMCI', name: 'Super Micro Computer', sector: 'Technology', basePrice: 328.60 },
  { symbol: 'DELL', name: 'Dell Technologies', sector: 'Technology', basePrice: 118.40 },
  { symbol: 'HPQ', name: 'HP Inc.', sector: 'Technology', basePrice: 28.60 },
  { symbol: 'HPE', name: 'Hewlett Packard Enterprise', sector: 'Technology', basePrice: 18.40 },
  { symbol: 'WDC', name: 'Western Digital', sector: 'Technology', basePrice: 48.60 },
  { symbol: 'STX', name: 'Seagate Technology', sector: 'Technology', basePrice: 88.40 },
  { symbol: 'ZBRA', name: 'Zebra Technologies', sector: 'Technology', basePrice: 308.60 },
  { symbol: 'KEYS', name: 'Keysight Technologies', sector: 'Technology', basePrice: 148.40 },
  { symbol: 'ANSS', name: 'Ansys Inc.', sector: 'Technology', basePrice: 328.60 },
  { symbol: 'MANH', name: 'Manhattan Associates', sector: 'Technology', basePrice: 228.40 },
  { symbol: 'PAYC', name: 'Paycom Software', sector: 'Technology', basePrice: 178.60 },
  { symbol: 'PCTY', name: 'Paylocity Holding', sector: 'Technology', basePrice: 168.40 },
  { symbol: 'BILL', name: 'BILL Holdings', sector: 'Technology', basePrice: 68.60 },
  { symbol: 'APPN', name: 'Appian Corp.', sector: 'Technology', basePrice: 38.40 },
  { symbol: 'NCNO', name: 'nCino Inc.', sector: 'Technology', basePrice: 32.80 },
  { symbol: 'FROG', name: 'JFrog Ltd.', sector: 'Technology', basePrice: 28.60 },
  { symbol: 'GTLB', name: 'GitLab Inc.', sector: 'Technology', basePrice: 58.40 },
  { symbol: 'MNDY', name: 'monday.com Ltd.', sector: 'Technology', basePrice: 218.60 },
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
