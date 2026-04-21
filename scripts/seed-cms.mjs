/**
 * Sanity CMS Seed Script
 * Seeds all Categories, Tags, and Impacts defined in SANITY_CMS_STRUCTURE.md
 *
 * Usage:
 *   node scripts/seed-cms.mjs
 *
 * Requirements:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID  — in .env.local
 *   NEXT_PUBLIC_SANITY_DATASET     — in .env.local
 *   SANITY_API_WRITE_TOKEN         — in .env.local  (needs write permission)
 *
 * To get a write token:
 *   https://www.sanity.io/manage → your project → API → Tokens → Add API token (Editor)
 */

import { createClient } from 'next-sanity';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ─── Load .env.local ─────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');

try {
  const envFile = readFileSync(envPath, 'utf-8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  console.warn('⚠️  .env.local not found — using existing process.env values.');
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token     = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('❌ Missing required env vars:\n   NEXT_PUBLIC_SANITY_PROJECT_ID\n   NEXT_PUBLIC_SANITY_DATASET\n   SANITY_API_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-04-07',
  useCdn: false,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function toId(prefix, slug) {
  return `${prefix}-${slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}`;
}

async function upsert(doc) {
  return client.createOrReplace(doc);
}

// ─── 1. IMPACTS ──────────────────────────────────────────────────────────────
const IMPACTS = [
  { name: 'Positive', slug: 'positive', color: 'green',  description: 'Bullish news, positive market development' },
  { name: 'Negative', slug: 'negative', color: 'red',    description: 'Bearish news, negative market development' },
  { name: 'Neutral',  slug: 'neutral',  color: 'zinc',   description: 'Neutral or informational content, no clear bias' },
];

// ─── 2. CATEGORIES ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Markets',       slug: 'markets',       description: 'Price movements, trading activity, market analysis',             icon: 'BarChart2',    color: 'blue',   contentType: 'news' },
  { name: 'Tech',          slug: 'tech',          description: 'Blockchain technology, upgrades, infrastructure',               icon: 'Cpu',          color: 'purple', contentType: 'news' },
  { name: 'Finance',       slug: 'finance',       description: 'TradFi integration, institutional adoption, banking',           icon: 'Landmark',     color: 'green',  contentType: 'news' },
  { name: 'Policy',        slug: 'policy',        description: 'Regulation, legislation, government action',                    icon: 'Scale',        color: 'red',    contentType: 'news' },
  { name: 'Web3',          slug: 'web3',          description: 'Decentralized applications, smart contracts, dApps',           icon: 'Globe',        color: 'indigo', contentType: 'news' },
  { name: 'Opinion',       slug: 'opinion',       description: 'Editorials, analysis, expert commentary',                      icon: 'MessageSquare',color: 'yellow', contentType: 'news' },
  { name: 'Learn',         slug: 'learn',         description: 'Educational content, guides, tutorials',                       icon: 'BookOpen',     color: 'orange', contentType: 'news' },
  { name: 'Research',      slug: 'research',      description: 'In-depth reports, data analysis, research papers',             icon: 'FileText',     color: 'blue',   contentType: 'research' },
  { name: 'Press Release', slug: 'press-release', description: 'Official announcements, company news',                        icon: 'Bell',         color: 'zinc',   contentType: 'news' },
  { name: 'News Analysis', slug: 'news-analysis', description: 'Deep-dive analysis of breaking news',                         icon: 'Search',       color: 'purple', contentType: 'news' },
  { name: 'Layer 2',       slug: 'layer-2',       description: 'Scaling solutions, L2 protocols, sidechains',                  icon: 'Layers',       color: 'indigo', contentType: 'news' },
  { name: 'Indices',       slug: 'indices',       description: 'Market benchmarks, performance indexes, index tracking',       icon: 'TrendingUp',   color: 'blue',   contentType: 'news' },
  { name: 'Daybook',       slug: 'daybook',       description: 'Daily market wrap, upcoming events, calendar',                 icon: 'Calendar',     color: 'zinc',   contentType: 'news' },
  { name: 'Sponsored',     slug: 'sponsored',     description: 'Sponsored content, partner articles, branded content',        icon: 'Star',         color: 'yellow', contentType: 'all' },
];

// ─── 3. TAGS ─────────────────────────────────────────────────────────────────
const TAGS = [
  // 2.1 Tokens & Blockchains
  { name: 'Bitcoin',          slug: 'bitcoin',          group: 'tokens', color: 'yellow' },
  { name: 'Ethereum',         slug: 'ethereum',         group: 'tokens', color: 'purple' },
  { name: 'Solana',           slug: 'solana',           group: 'tokens', color: 'purple' },
  { name: 'XRP',              slug: 'xrp',              group: 'tokens', color: 'blue'   },
  { name: 'BNB',              slug: 'bnb',              group: 'tokens', color: 'yellow' },
  { name: 'Cardano',          slug: 'cardano',          group: 'tokens', color: 'blue'   },
  { name: 'Polkadot',         slug: 'polkadot',         group: 'tokens', color: 'purple' },
  { name: 'Avalanche',        slug: 'avalanche',        group: 'tokens', color: 'red'    },
  { name: 'Tron',             slug: 'tron',             group: 'tokens', color: 'red'    },
  { name: 'Sui',              slug: 'sui',              group: 'tokens', color: 'blue'   },
  { name: 'Monad',            slug: 'monad',            group: 'tokens', color: 'purple' },
  { name: 'Polygon',          slug: 'polygon',          group: 'tokens', color: 'purple' },
  { name: 'Optimism',         slug: 'optimism',         group: 'tokens', color: 'red'    },
  { name: 'Starknet',         slug: 'starknet',         group: 'tokens', color: 'blue'   },
  { name: 'Near',             slug: 'near',             group: 'tokens', color: 'green'  },
  { name: 'Litecoin',         slug: 'litecoin',         group: 'tokens', color: 'zinc'   },
  { name: 'Monero',           slug: 'monero',           group: 'tokens', color: 'orange' },
  { name: 'Zcash',            slug: 'zcash',            group: 'tokens', color: 'yellow' },
  { name: 'Toncoin',          slug: 'toncoin',          group: 'tokens', color: 'blue'   },
  { name: 'Stellar',          slug: 'stellar',          group: 'tokens', color: 'blue'   },
  { name: 'Filecoin',         slug: 'filecoin',         group: 'tokens', color: 'blue'   },
  { name: 'ICP',              slug: 'icp',              group: 'tokens', color: 'purple' },
  { name: 'Ripple',           slug: 'ripple',           group: 'tokens', color: 'blue'   },
  { name: 'Cosmos',           slug: 'cosmos',           group: 'tokens', color: 'purple' },
  { name: 'Algorand',         slug: 'algorand',         group: 'tokens', color: 'blue'   },
  { name: 'Hedera',           slug: 'hedera',           group: 'tokens', color: 'green'  },
  { name: 'Aptos',            slug: 'aptos',            group: 'tokens', color: 'blue'   },
  { name: 'Arbitrum',         slug: 'arbitrum',         group: 'tokens', color: 'blue'   },
  { name: 'Base',             slug: 'base',             group: 'tokens', color: 'blue'   },
  { name: 'Linea',            slug: 'linea',            group: 'tokens', color: 'purple' },

  // 2.2 Market Activity & Trading
  { name: 'Trading',           slug: 'trading',           group: 'market', color: 'blue'   },
  { name: 'Technical Analysis',slug: 'technical-analysis',group: 'market', color: 'blue'   },
  { name: 'Market Wrap',       slug: 'market-wrap',       group: 'market', color: 'zinc'   },
  { name: 'Volatility',        slug: 'volatility',        group: 'market', color: 'red'    },
  { name: 'Liquidations',      slug: 'liquidations',      group: 'market', color: 'red'    },
  { name: 'Futures',           slug: 'futures',           group: 'market', color: 'blue'   },
  { name: 'Options',           slug: 'options',           group: 'market', color: 'blue'   },
  { name: 'Shorts',            slug: 'shorts',            group: 'market', color: 'red'    },
  { name: 'Yield',             slug: 'yield',             group: 'market', color: 'green'  },
  { name: 'Macro',             slug: 'macro',             group: 'market', color: 'zinc'   },
  { name: 'Stocks',            slug: 'stocks',            group: 'market', color: 'blue'   },
  { name: 'Equities',          slug: 'equities',          group: 'market', color: 'blue'   },
  { name: 'S&P 500',           slug: 's-p-500',           group: 'market', color: 'blue'   },
  { name: 'Gold',              slug: 'gold',              group: 'market', color: 'yellow' },
  { name: 'Silver',            slug: 'silver',            group: 'market', color: 'zinc'   },

  // 2.3 DeFi & Infrastructure
  { name: 'DeFi',              slug: 'defi',              group: 'defi', color: 'purple' },
  { name: 'Staking',           slug: 'staking',           group: 'defi', color: 'blue'   },
  { name: 'Liquid Staking',    slug: 'liquid-staking',    group: 'defi', color: 'blue'   },
  { name: 'Layer 1',           slug: 'layer-1',           group: 'defi', color: 'zinc'   },
  { name: 'Layer 2',           slug: 'layer-2-tag',       group: 'defi', color: 'indigo' },
  { name: 'NFT',               slug: 'nft',               group: 'defi', color: 'purple' },
  { name: 'Tokenization',      slug: 'tokenization',      group: 'defi', color: 'blue'   },
  { name: 'Real World Assets', slug: 'real-world-assets', group: 'defi', color: 'green'  },
  { name: 'Stablecoins',       slug: 'stablecoins',       group: 'defi', color: 'green'  },
  { name: 'USDC',              slug: 'usdc',              group: 'defi', color: 'blue'   },
  { name: 'USDT',              slug: 'usdt',              group: 'defi', color: 'green'  },
  { name: 'Aave',              slug: 'aave',              group: 'defi', color: 'purple' },
  { name: 'Uniswap',           slug: 'uniswap',           group: 'defi', color: 'purple' },
  { name: 'MakerDAO',          slug: 'makerdao',          group: 'defi', color: 'green'  },
  { name: 'Lido',              slug: 'lido',              group: 'defi', color: 'blue'   },
  { name: 'Curve',             slug: 'curve',             group: 'defi', color: 'yellow' },
  { name: 'Compound',          slug: 'compound',          group: 'defi', color: 'green'  },
  { name: 'OpenSea',           slug: 'opensea',           group: 'defi', color: 'blue'   },
  { name: 'MetaMask',          slug: 'metamask',          group: 'defi', color: 'orange' },
  { name: 'Wallet',            slug: 'wallet',            group: 'defi', color: 'zinc'   },

  // 2.4 Regulation & Compliance
  { name: 'Regulation',                       slug: 'regulation',                       group: 'regulation', color: 'red'    },
  { name: 'SEC',                              slug: 'sec',                              group: 'regulation', color: 'red'    },
  { name: 'CFTC',                             slug: 'cftc',                             group: 'regulation', color: 'red'    },
  { name: 'Legislation',                      slug: 'legislation',                      group: 'regulation', color: 'red'    },
  { name: 'Stablecoin Legislation',           slug: 'stablecoin-legislation',           group: 'regulation', color: 'red'    },
  { name: 'Market Structure',                 slug: 'market-structure',                 group: 'regulation', color: 'zinc'   },
  { name: 'Sanctions',                        slug: 'sanctions',                        group: 'regulation', color: 'red'    },
  { name: 'Tax',                              slug: 'tax',                              group: 'regulation', color: 'zinc'   },
  { name: 'MiCA',                             slug: 'mica',                             group: 'regulation', color: 'blue'   },
  { name: 'White House',                      slug: 'white-house',                      group: 'regulation', color: 'blue'   },
  { name: 'U.S. Congress',                    slug: 'us-congress',                      group: 'regulation', color: 'blue'   },
  { name: 'U.S. Senate',                      slug: 'us-senate',                        group: 'regulation', color: 'blue'   },
  { name: 'Senate Banking Committee',         slug: 'senate-banking-committee',         group: 'regulation', color: 'blue'   },
  { name: 'House Financial Services Committee',slug:'house-financial-services-committee',group:'regulation', color: 'blue'   },
  { name: 'FCA',                              slug: 'fca',                              group: 'regulation', color: 'red'    },
  { name: 'Money Laundering',                 slug: 'money-laundering',                 group: 'regulation', color: 'red'    },
  { name: 'Compliance',                       slug: 'compliance',                       group: 'regulation', color: 'zinc'   },
  { name: 'KYC/AML',                          slug: 'kyc-aml',                          group: 'regulation', color: 'zinc'   },

  // 2.5 Companies & Institutions
  { name: 'MicroStrategy',     slug: 'microstrategy',     group: 'companies', color: 'orange' },
  { name: 'Coinbase',          slug: 'coinbase',          group: 'companies', color: 'blue'   },
  { name: 'Binance',           slug: 'binance',           group: 'companies', color: 'yellow' },
  { name: 'Kraken',            slug: 'kraken',            group: 'companies', color: 'purple' },
  { name: 'Grayscale',         slug: 'grayscale',         group: 'companies', color: 'blue'   },
  { name: 'VanEck',            slug: 'vaneck',            group: 'companies', color: 'blue'   },
  { name: 'BlackRock',         slug: 'blackrock',         group: 'companies', color: 'zinc'   },
  { name: 'Galaxy Digital',    slug: 'galaxy-digital',    group: 'companies', color: 'blue'   },
  { name: 'Gemini',            slug: 'gemini',            group: 'companies', color: 'blue'   },
  { name: 'Ledger',            slug: 'ledger',            group: 'companies', color: 'zinc'   },
  { name: 'Fireblocks',        slug: 'fireblocks',        group: 'companies', color: 'blue'   },
  { name: 'Paxos',             slug: 'paxos',             group: 'companies', color: 'yellow' },
  { name: 'Securitize',        slug: 'securitize',        group: 'companies', color: 'blue'   },
  { name: 'JPMorgan',          slug: 'jpmorgan',          group: 'companies', color: 'blue'   },
  { name: 'Goldman Sachs',     slug: 'goldman-sachs',     group: 'companies', color: 'blue'   },
  { name: 'Morgan Stanley',    slug: 'morgan-stanley',    group: 'companies', color: 'blue'   },
  { name: 'Fidelity',          slug: 'fidelity',          group: 'companies', color: 'green'  },
  { name: 'Mastercard',        slug: 'mastercard',        group: 'companies', color: 'red'    },
  { name: 'Visa',              slug: 'visa',              group: 'companies', color: 'blue'   },
  { name: 'PayPal',            slug: 'paypal',            group: 'companies', color: 'blue'   },
  { name: 'Stripe',            slug: 'stripe',            group: 'companies', color: 'purple' },
  { name: 'Franklin Templeton',slug: 'franklin-templeton',group: 'companies', color: 'blue'   },
  { name: 'Robinhood',         slug: 'robinhood',         group: 'companies', color: 'green'  },
  { name: 'OKX',               slug: 'okx',               group: 'companies', color: 'blue'   },
  { name: 'Bybit',             slug: 'bybit',             group: 'companies', color: 'yellow' },

  // 2.6 Key Figures
  { name: 'Michael Saylor',    slug: 'michael-saylor',    group: 'people', color: 'orange' },
  { name: 'Vitalik Buterin',   slug: 'vitalik-buterin',   group: 'people', color: 'purple' },
  { name: 'Elon Musk',         slug: 'elon-musk',         group: 'people', color: 'zinc'   },
  { name: 'Justin Sun',        slug: 'justin-sun',        group: 'people', color: 'red'    },
  { name: 'Sam Bankman-Fried', slug: 'sam-bankman-fried', group: 'people', color: 'red'    },
  { name: 'Changpeng Zhao',    slug: 'changpeng-zhao',    group: 'people', color: 'yellow' },
  { name: 'Brian Armstrong',   slug: 'brian-armstrong',   group: 'people', color: 'blue'   },
  { name: 'Paul Atkins',       slug: 'paul-atkins',       group: 'people', color: 'blue'   },
  { name: 'Hester Peirce',     slug: 'hester-peirce',     group: 'people', color: 'blue'   },
  { name: 'Jerome Powell',     slug: 'jerome-powell',     group: 'people', color: 'zinc'   },
  { name: 'Gary Gensler',      slug: 'gary-gensler',      group: 'people', color: 'red'    },
  { name: 'Javier Milei',      slug: 'javier-milei',      group: 'people', color: 'orange' },
  { name: 'Trump',             slug: 'trump',             group: 'people', color: 'red'    },
  { name: 'Mark Zuckerberg',   slug: 'mark-zuckerberg',   group: 'people', color: 'blue'   },
  { name: 'Jensen Huang',      slug: 'jensen-huang',      group: 'people', color: 'green'  },
  { name: 'Satoshi Nakamoto',  slug: 'satoshi-nakamoto',  group: 'people', color: 'yellow' },
  { name: 'Do Kwon',           slug: 'do-kwon',           group: 'people', color: 'red'    },
  { name: 'SBF',               slug: 'sbf',               group: 'people', color: 'red'    },
  { name: 'CZ',                slug: 'cz',                group: 'people', color: 'yellow' },
  { name: 'Brian Shrader',     slug: 'brian-shrader',     group: 'people', color: 'blue'   },

  // 2.7 Events & Milestones
  { name: 'Funding Rounds', slug: 'funding-rounds', group: 'events', color: 'green'  },
  { name: 'IPO',            slug: 'ipo',            group: 'events', color: 'blue'   },
  { name: 'M&A',            slug: 'm-a',            group: 'events', color: 'zinc'   },
  { name: 'Hack',           slug: 'hack',           group: 'events', color: 'red'    },
  { name: 'Exploit',        slug: 'exploit',        group: 'events', color: 'red'    },
  { name: 'Airdrop',        slug: 'airdrop',        group: 'events', color: 'green'  },
  { name: 'Acquisition',    slug: 'acquisition',    group: 'events', color: 'blue'   },
  { name: 'Hard Fork',      slug: 'hard-fork',      group: 'events', color: 'orange' },
  { name: 'Upgrade',        slug: 'upgrade',        group: 'events', color: 'green'  },
  { name: 'Launch',         slug: 'launch',         group: 'events', color: 'green'  },
  { name: 'Bankruptcy',     slug: 'bankruptcy',     group: 'events', color: 'red'    },
  { name: 'Lawsuit',        slug: 'lawsuit',        group: 'events', color: 'red'    },
  { name: 'Settlement',     slug: 'settlement',     group: 'events', color: 'zinc'   },
  { name: 'Merger',         slug: 'merger',         group: 'events', color: 'blue'   },
  { name: 'Delisting',      slug: 'delisting',      group: 'events', color: 'red'    },

  // 2.8 Geography
  { name: 'United States',  slug: 'united-states',  group: 'geography', color: 'blue'   },
  { name: 'Europe',         slug: 'europe',         group: 'geography', color: 'blue'   },
  { name: 'United Kingdom', slug: 'united-kingdom', group: 'geography', color: 'blue'   },
  { name: 'Asia',           slug: 'asia',           group: 'geography', color: 'red'    },
  { name: 'Hong Kong',      slug: 'hong-kong',      group: 'geography', color: 'red'    },
  { name: 'Singapore',      slug: 'singapore',      group: 'geography', color: 'red'    },
  { name: 'UAE',            slug: 'uae',            group: 'geography', color: 'green'  },
  { name: 'Japan',          slug: 'japan',          group: 'geography', color: 'red'    },
  { name: 'South Korea',    slug: 'south-korea',    group: 'geography', color: 'blue'   },
  { name: 'India',          slug: 'india',          group: 'geography', color: 'orange' },
  { name: 'Brazil',         slug: 'brazil',         group: 'geography', color: 'green'  },
  { name: 'Mexico',         slug: 'mexico',         group: 'geography', color: 'green'  },
  { name: 'Canada',         slug: 'canada',         group: 'geography', color: 'red'    },
  { name: 'Australia',      slug: 'australia',      group: 'geography', color: 'yellow' },
  { name: 'Germany',        slug: 'germany',        group: 'geography', color: 'zinc'   },
  { name: 'France',         slug: 'france',         group: 'geography', color: 'blue'   },
  { name: 'Switzerland',    slug: 'switzerland',    group: 'geography', color: 'red'    },
  { name: 'Russia',         slug: 'russia',         group: 'geography', color: 'red'    },
  { name: 'China',          slug: 'china',          group: 'geography', color: 'red'    },
  { name: 'El Salvador',    slug: 'el-salvador',    group: 'geography', color: 'blue'   },

  // 2.9 Content Type & Format
  { name: 'Breaking News', slug: 'breaking-news', group: 'content-type', color: 'red'    },
  { name: 'Feature',       slug: 'feature',       group: 'content-type', color: 'blue'   },
  { name: 'Analysis',      slug: 'analysis',      group: 'content-type', color: 'blue'   },
  { name: 'Interview',     slug: 'interview',     group: 'content-type', color: 'green'  },
  { name: 'Explainer',     slug: 'explainer',     group: 'content-type', color: 'purple' },
  { name: 'Exclusive',     slug: 'exclusive',     group: 'content-type', color: 'yellow' },
  { name: 'Top Stories',   slug: 'top-stories',   group: 'content-type', color: 'zinc'   },

  // 2.10 Sentiment
  { name: 'Bullish', slug: 'bullish', group: 'sentiment', color: 'green' },
  { name: 'Bearish', slug: 'bearish', group: 'sentiment', color: 'red'   },
  { name: 'Neutral', slug: 'neutral', group: 'sentiment', color: 'zinc'  },

  // 2.11 Research Topics
  { name: 'Market Analysis',     slug: 'market-analysis',    group: 'research', color: 'blue'   },
  { name: 'Adoption Trends',     slug: 'adoption-trends',    group: 'research', color: 'green'  },
  { name: 'Exchange Review',     slug: 'exchange-review',    group: 'research', color: 'blue'   },
  { name: 'Privacy Research',    slug: 'privacy-research',   group: 'research', color: 'purple' },
  { name: 'DeFi Analysis',       slug: 'defi-analysis',      group: 'research', color: 'purple' },
  { name: 'Mining Report',       slug: 'mining-report',      group: 'research', color: 'zinc'   },
  { name: 'Network Analysis',    slug: 'network-analysis',   group: 'research', color: 'blue'   },
  { name: 'Institutional Flows', slug: 'institutional-flows',group: 'research', color: 'blue'   },
  { name: 'Derivatives',         slug: 'derivatives',        group: 'research', color: 'red'    },
  { name: 'Regulatory Analysis', slug: 'regulatory-analysis',group: 'research', color: 'red'    },
  { name: 'Quarterly Review',    slug: 'quarterly-review',   group: 'research', color: 'blue'   },
  { name: 'Annual Report',       slug: 'annual-report',      group: 'research', color: 'blue'   },
  { name: 'Index Performance',   slug: 'index-performance',  group: 'research', color: 'green'  },
  { name: 'Benchmark Data',      slug: 'benchmark-data',     group: 'research', color: 'zinc'   },
  { name: 'Ecosystem Report',    slug: 'ecosystem-report',   group: 'research', color: 'green'  },
  { name: 'Whitepaper',          slug: 'whitepaper',         group: 'research', color: 'zinc'   },
  { name: 'Case Study',          slug: 'case-study',         group: 'research', color: 'blue'   },
  { name: 'Deep Dive',           slug: 'deep-dive',          group: 'research', color: 'purple' },

  // 2.12 Video Shows
  { name: 'First Mover',               slug: 'first-mover',               group: 'video-shows', color: 'blue'   },
  { name: 'Markets Daily',             slug: 'markets-daily',             group: 'video-shows', color: 'blue'   },
  { name: 'The Hash',                  slug: 'the-hash',                  group: 'video-shows', color: 'purple' },
  { name: 'The Protocol',              slug: 'the-protocol',              group: 'video-shows', color: 'blue'   },
  { name: 'Unchained',                 slug: 'unchained',                 group: 'video-shows', color: 'orange' },
  { name: 'CoinDesk Spotlight',        slug: 'coindesk-spotlight',        group: 'video-shows', color: 'blue'   },
  { name: 'Money Reimagined',          slug: 'money-reimagined',          group: 'video-shows', color: 'green'  },
  { name: 'The Mining Pod',            slug: 'the-mining-pod',            group: 'video-shows', color: 'zinc'   },
  { name: 'Community Crypto',          slug: 'community-crypto',          group: 'video-shows', color: 'green'  },
  { name: 'NFT All-Stars',             slug: 'nft-all-stars',             group: 'video-shows', color: 'purple' },
  { name: 'Gen C',                     slug: 'gen-c',                     group: 'video-shows', color: 'blue'   },
  { name: 'Coin Toss',                 slug: 'coin-toss',                 group: 'video-shows', color: 'yellow' },
  { name: 'Word on the Block',         slug: 'word-on-the-block',         group: 'video-shows', color: 'blue'   },
  { name: 'Consensus Coverage',        slug: 'consensus-coverage',        group: 'video-shows', color: 'blue'   },
  { name: 'Conference Coverage',       slug: 'conference-coverage',       group: 'video-shows', color: 'zinc'   },
  { name: 'Live Stream',               slug: 'live-stream',               group: 'video-shows', color: 'red'    },
  { name: 'Founder Series',            slug: 'founder-series',            group: 'video-shows', color: 'green'  },

  // 2.13 Podcast Series
  { name: 'The Breakdown',             slug: 'the-breakdown',             group: 'podcast-series', color: 'orange' },
  { name: 'Unchained Podcast',         slug: 'unchained-podcast',         group: 'podcast-series', color: 'orange' },
  { name: 'The Hash Podcast',          slug: 'the-hash-podcast',          group: 'podcast-series', color: 'purple' },
  { name: 'The Protocol Podcast',      slug: 'the-protocol-podcast',      group: 'podcast-series', color: 'blue'   },
  { name: 'CoinDesk Reports',          slug: 'coindesk-reports',          group: 'podcast-series', color: 'blue'   },
  { name: 'Borderless',                slug: 'borderless',                group: 'podcast-series', color: 'green'  },
  { name: 'Crypto Crooks',             slug: 'crypto-crooks',             group: 'podcast-series', color: 'red'    },
  { name: 'Hard Problems',             slug: 'hard-problems',             group: 'podcast-series', color: 'zinc'   },
  { name: 'Markets Outlook',           slug: 'markets-outlook',           group: 'podcast-series', color: 'blue'   },
  { name: 'New Money',                 slug: 'new-money',                 group: 'podcast-series', color: 'green'  },
  { name: 'On Purpose',                slug: 'on-purpose',                group: 'podcast-series', color: 'purple' },
  { name: 'Opinionated',               slug: 'opinionated',               group: 'podcast-series', color: 'yellow' },
  { name: 'Public Keys',               slug: 'public-keys',               group: 'podcast-series', color: 'blue'   },
  { name: 'The Policy Protocol',       slug: 'the-policy-protocol',       group: 'podcast-series', color: 'red'    },
  { name: 'Women Who Web3',            slug: 'women-who-web3',            group: 'podcast-series', color: 'purple' },
  { name: 'Carpe Consensus',           slug: 'carpe-consensus',           group: 'podcast-series', color: 'blue'   },
  { name: 'Crypto Talks',              slug: 'crypto-talks',              group: 'podcast-series', color: 'blue'   },
  { name: 'Mapping Out Eth',           slug: 'mapping-out-eth',           group: 'podcast-series', color: 'purple' },
];

// ─── Runner ──────────────────────────────────────────────────────────────────
async function seed() {
  const results = { impacts: 0, categories: 0, tags: 0, errors: [] };

  console.log(`\n🌱 Seeding Sanity CMS — project: ${projectId} / dataset: ${dataset}\n`);

  // Impacts
  console.log(`📊 Seeding ${IMPACTS.length} impacts...`);
  for (const item of IMPACTS) {
    try {
      await upsert({
        _id:   toId('impact', item.slug),
        _type: 'impact',
        name:  item.name,
        slug:  { _type: 'slug', current: item.slug },
        color: item.color,
        description: item.description,
      });
      results.impacts++;
      process.stdout.write('.');
    } catch (err) {
      results.errors.push(`impact:${item.slug} — ${err.message}`);
      process.stdout.write('✗');
    }
  }
  console.log(` ✅ ${results.impacts}/${IMPACTS.length}\n`);

  // Categories
  console.log(`📁 Seeding ${CATEGORIES.length} categories...`);
  for (const item of CATEGORIES) {
    try {
      await upsert({
        _id:         toId('category', item.slug),
        _type:       'category',
        name:        item.name,
        slug:        { _type: 'slug', current: item.slug },
        description: item.description,
        icon:        item.icon,
        color:       item.color,
        contentType: item.contentType,
      });
      results.categories++;
      process.stdout.write('.');
    } catch (err) {
      results.errors.push(`category:${item.slug} — ${err.message}`);
      process.stdout.write('✗');
    }
  }
  console.log(` ✅ ${results.categories}/${CATEGORIES.length}\n`);

  // Tags
  console.log(`🏷️  Seeding ${TAGS.length} tags...`);
  for (const item of TAGS) {
    try {
      await upsert({
        _id:   toId('tag', item.slug),
        _type: 'tag',
        name:  item.name,
        slug:  { _type: 'slug', current: item.slug },
        group: item.group,
        color: item.color,
      });
      results.tags++;
      process.stdout.write('.');
    } catch (err) {
      results.errors.push(`tag:${item.slug} — ${err.message}`);
      process.stdout.write('✗');
    }
  }
  console.log(` ✅ ${results.tags}/${TAGS.length}\n`);

  // Summary
  console.log('─'.repeat(50));
  console.log(`✅ Impacts:    ${results.impacts}/${IMPACTS.length}`);
  console.log(`✅ Categories: ${results.categories}/${CATEGORIES.length}`);
  console.log(`✅ Tags:       ${results.tags}/${TAGS.length}`);
  console.log(`📦 Total:      ${results.impacts + results.categories + results.tags} documents`);

  if (results.errors.length) {
    console.log(`\n⚠️  ${results.errors.length} errors:`);
    results.errors.forEach(e => console.log(`   • ${e}`));
  } else {
    console.log('\n🎉 All documents seeded successfully!');
  }
}

seed().catch((err) => {
  console.error('\n❌ Seed failed:', err.message);
  process.exit(1);
});
