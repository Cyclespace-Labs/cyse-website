# Sanity CMS Structure - Crypto News Platform

## Overview
This document defines the complete taxonomy and schema structure for the crypto news platform, based on industry standards from CoinDesk and other leading crypto news outlets.

---

## 1. Categories (Primary Content Sections)

Categories are top-level content buckets used to organize articles by topic. Each article must have exactly one category.

| ID | Name | Slug | Description |
|---|---|---|---|
| 1 | Markets | `markets` | Price movements, trading activity, market analysis |
| 2 | Tech | `tech` | Blockchain technology, upgrades, infrastructure |
| 3 | Finance | `finance` | TradFi integration, institutional adoption, banking |
| 4 | Policy | `policy` | Regulation, legislation, government action |
| 5 | Web3 | `web3` | Decentralized applications, smart contracts, dApps |
| 6 | Opinion | `opinion` | Editorials, analysis, expert commentary |
| 7 | Learn | `learn` | Educational content, guides, tutorials |
| 8 | Research | `research` | In-depth reports, data analysis, research papers |
| 9 | Press Release | `press-release` | Official announcements, company news |
| 10 | News Analysis | `news-analysis` | Deep-dive analysis of breaking news |
| 11 | Layer 2 | `layer-2` | Scaling solutions, L2 protocols, sidechains |
| 12 | Indices | `indices` | CoinDesk indices, market benchmarks, performance tracking |
| 13 | Daybook | `daybook` | Daily market wrap, upcoming events, calendar |
| 14 | Sponsored | `sponsored` | Sponsored content, partner articles, branded content |

---

## 1.5 Content Types (Beyond Articles)

In addition to news articles, the platform supports multiple content formats:

| Type | Slug | Description | Max Duration |
|---|---|---|---|
| Article | `article` | Written news, analysis, features | N/A |
| Video | `video` | Standalone videos, interviews, clips | 30 min |
| Podcast | `podcast` | Audio episodes, interviews, discussions | 60 min |
| Research Report | `research-report` | In-depth research papers, data analysis | N/A |
| Webinar | `webinar` | Live/recorded educational sessions | 90 min |
| Newsletter | `newsletter` | Email-based content digests | N/A |
| Price Page | `price-page` | Token/asset price tracking pages | N/A |

---

## 2. Tags (Secondary Metadata)

Tags provide additional context and enable cross-article filtering. Articles can have multiple tags (recommended: 2-5 per article).

### 2.1 Tokens & Blockchains (30 tags)

Core cryptocurrencies and blockchain networks.

| Tag | Slug |
|---|---|
| Bitcoin | `bitcoin` |
| Ethereum | `ethereum` |
| Solana | `solana` |
| XRP | `xrp` |
| BNB | `bnb` |
| Cardano | `cardano` |
| Polkadot | `polkadot` |
| Avalanche | `avalanche` |
| Tron | `tron` |
| Sui | `sui` |
| Monad | `monad` |
| Polygon | `polygon` |
| Optimism | `optimism` |
| Starknet | `starknet` |
| Near | `near` |
| Litecoin | `litecoin` |
| Monero | `monero` |
| Zcash | `zcash` |
| Toncoin | `toncoin` |
| Stellar | `stellar` |
| Filecoin | `filecoin` |
| ICP | `icp` |
| Ripple | `ripple` |
| Cosmos | `cosmos` |
| Algorand | `algorand` |
| Hedera | `hedera` |
| Aptos | `aptos` |
| Arbitrum | `arbitrum` |
| Base | `base` |
| Linea | `linea` |

### 2.2 Market Activity & Trading (15 tags)

Price action, trading mechanics, and market dynamics.

| Tag | Slug |
|---|---|
| Trading | `trading` |
| Technical Analysis | `technical-analysis` |
| Market Wrap | `market-wrap` |
| Volatility | `volatility` |
| Liquidations | `liquidations` |
| Futures | `futures` |
| Options | `options` |
| Shorts | `shorts` |
| Yield | `yield` |
| Macro | `macro` |
| Stocks | `stocks` |
| Equities | `equities` |
| S&P 500 | `s-p-500` |
| Gold | `gold` |
| Silver | `silver` |

### 2.3 DeFi & Infrastructure (20 tags)

Decentralized finance protocols and blockchain infrastructure.

| Tag | Slug |
|---|---|
| DeFi | `defi` |
| Staking | `staking` |
| Liquid Staking | `liquid-staking` |
| Layer 1 | `layer-1` |
| Layer 2 | `layer-2` |
| NFT | `nft` |
| Tokenization | `tokenization` |
| Real World Assets | `real-world-assets` |
| Stablecoins | `stablecoins` |
| USDC | `usdc` |
| USDT | `usdt` |
| Aave | `aave` |
| Uniswap | `uniswap` |
| MakerDAO | `makerdao` |
| Lido | `lido` |
| Curve | `curve` |
| Compound | `compound` |
| OpenSea | `opensea` |
| MetaMask | `metamask` |
| Wallet | `wallet` |

### 2.4 Regulation & Compliance (18 tags)

Government action, regulatory frameworks, and legal matters.

| Tag | Slug |
|---|---|
| Regulation | `regulation` |
| SEC | `sec` |
| CFTC | `cftc` |
| Legislation | `legislation` |
| Stablecoin Legislation | `stablecoin-legislation` |
| Market Structure | `market-structure` |
| Sanctions | `sanctions` |
| Tax | `tax` |
| MiCA | `mica` |
| White House | `white-house` |
| U.S. Congress | `us-congress` |
| U.S. Senate | `us-senate` |
| Senate Banking Committee | `senate-banking-committee` |
| House Financial Services Committee | `house-financial-services-committee` |
| FCA | `fca` |
| Money Laundering | `money-laundering` |
| Compliance | `compliance` |
| KYC/AML | `kyc-aml` |

### 2.5 Companies & Institutions (25 tags)

Major players in crypto and traditional finance.

| Tag | Slug |
|---|---|
| MicroStrategy | `microstrategy` |
| Coinbase | `coinbase` |
| Binance | `binance` |
| Kraken | `kraken` |
| Ripple | `ripple` |
| Grayscale | `grayscale` |
| VanEck | `vaneck` |
| BlackRock | `blackrock` |
| Galaxy Digital | `galaxy-digital` |
| Gemini | `gemini` |
| Ledger | `ledger` |
| MetaMask | `metamask` |
| Fireblocks | `fireblocks` |
| Paxos | `paxos` |
| Securitize | `securitize` |
| JPMorgan | `jpmorgan` |
| Goldman Sachs | `goldman-sachs` |
| Morgan Stanley | `morgan-stanley` |
| Fidelity | `fidelity` |
| Mastercard | `mastercard` |
| Visa | `visa` |
| PayPal | `paypal` |
| Stripe | `stripe` |
| Franklin Templeton | `franklin-templeton` |
| Robinhood | `robinhood` |

### 2.6 Key Figures & Personalities (20 tags)

Influential leaders and personalities in crypto.

| Tag | Slug |
|---|---|
| Michael Saylor | `michael-saylor` |
| Vitalik Buterin | `vitalik-buterin` |
| Elon Musk | `elon-musk` |
| Justin Sun | `justin-sun` |
| Sam Bankman-Fried | `sam-bankman-fried` |
| Changpeng Zhao | `changpeng-zhao` |
| Brian Armstrong | `brian-armstrong` |
| Paul Atkins | `paul-atkins` |
| Hester Peirce | `hester-peirce` |
| Jerome Powell | `jerome-powell` |
| Gary Gensler | `gary-gensler` |
| Javier Milei | `javier-milei` |
| Trump | `trump` |
| Mark Zuckerberg | `mark-zuckerberg` |
| Jensen Huang | `jensen-huang` |
| Satoshi Nakamoto | `satoshi-nakamoto` |
| Do Kwon | `do-kwon` |
| SBF | `sbf` |
| CZ | `cz` |
| Brian Shrader | `brian-shrader` |

### 2.7 Events & Milestones (15 tags)

Significant events and corporate actions.

| Tag | Slug |
|---|---|
| Funding Rounds | `funding-rounds` |
| IPO | `ipo` |
| M&A | `m-a` |
| Hack | `hack` |
| Exploit | `exploit` |
| Airdrop | `airdrop` |
| Acquisition | `acquisition` |
| Hard Fork | `hard-fork` |
| Upgrade | `upgrade` |
| Launch | `launch` |
| Bankruptcy | `bankruptcy` |
| Lawsuit | `lawsuit` |
| Settlement | `settlement` |
| Merger | `merger` |
| Delisting | `delisting` |

### 2.8 Geography & Regions (20 tags)

Geographic focus for regulatory and market news.

| Tag | Slug |
|---|---|
| United States | `united-states` |
| Europe | `europe` |
| United Kingdom | `united-kingdom` |
| Asia | `asia` |
| Hong Kong | `hong-kong` |
| Singapore | `singapore` |
| UAE | `uae` |
| Japan | `japan` |
| South Korea | `south-korea` |
| India | `india` |
| Brazil | `brazil` |
| Mexico | `mexico` |
| Canada | `canada` |
| Australia | `australia` |
| Germany | `germany` |
| France | `france` |
| Switzerland | `switzerland` |
| Russia | `russia` |
| China | `china` |
| El Salvador | `el-salvador` |

### 2.9 Content Type & Format (12 tags)

Editorial classification and content format.

| Tag | Slug |
|---|---|
| Breaking News | `breaking-news` |
| Feature | `feature` |
| Opinion | `opinion` |
| Analysis | `analysis` |
| Interview | `interview` |
| Explainer | `explainer` |
| Research | `research` |
| Video | `video` |
| Podcast | `podcast` |
| Newsletter | `newsletter` |
| Exclusive | `exclusive` |
| Top Stories | `top-stories` |

### 2.10 Sentiment & Impact (3 tags)

Market sentiment indicators (typically derived from impacts field).

| Tag | Slug |
|---|---|
| Bullish | `bullish` |
| Bearish | `bearish` |
| Neutral | `neutral` |

### 2.11 Research Topics (18 tags)

Specialized research focus areas.

| Tag | Slug |
|---|---|
| Market Analysis | `market-analysis` |
| Adoption Trends | `adoption-trends` |
| Exchange Review | `exchange-review` |
| Stablecoin Report | `stablecoin-report` |
| Tokenization | `tokenization` |
| Real World Assets | `real-world-assets` |
| Privacy Research | `privacy-research` |
| DeFi Analysis | `defi-analysis` |
| Mining Report | `mining-report` |
| Network Analysis | `network-analysis` |
| Institutional Flows | `institutional-flows` |
| Derivatives | `derivatives` |
| Regulatory Analysis | `regulatory-analysis` |
| Ecosystem Report | `ecosystem-report` |
| Quarterly Review | `quarterly-review` |
| Annual Report | `annual-report` |
| Index Performance | `index-performance` |
| Benchmark Data | `benchmark-data` |

### 2.12 Video Show Series (35+ tags)

Popular video show formats and series.

| Tag | Slug |
|---|---|
| First Mover | `first-mover` |
| Markets Daily | `markets-daily` |
| The Hash | `the-hash` |
| The Protocol | `the-protocol` |
| Unchained | `unchained` |
| CoinDesk Spotlight | `coindesk-spotlight` |
| Breaking News | `breaking-news-video` |
| Money Reimagined | `money-reimagined` |
| The Mining Pod | `the-mining-pod` |
| Community Crypto | `community-crypto` |
| NFT All-Stars | `nft-all-stars` |
| Gen C | `gen-c` |
| Coin Toss | `coin-toss` |
| Word on the Block | `word-on-the-block` |
| Forkast IQ | `forkast-iq` |
| The Meridian Conversations | `the-meridian-conversations` |
| Consensus Coverage | `consensus-coverage` |
| Summit Coverage | `summit-coverage` |
| Partner Content | `partner-content` |
| Special Event | `special-event` |
| Interview Series | `interview-series` |
| Founder Series | `founder-series` |
| Live Stream | `live-stream` |
| Conference Coverage | `conference-coverage` |

### 2.13 Podcast Series (24+ tags)

Popular podcast shows and series.

| Tag | Slug |
|---|---|
| The Breakdown | `the-breakdown` |
| Unchained Podcast | `unchained-podcast` |
| The Hash Podcast | `the-hash-podcast` |
| The Protocol Podcast | `the-protocol-podcast` |
| CoinDesk Reports | `coindesk-reports` |
| Borderless | `borderless` |
| Crypto Crooks | `crypto-crooks` |
| Hard Problems | `hard-problems` |
| Markets Outlook | `markets-outlook` |
| Money Reimagined Podcast | `money-reimagined-podcast` |
| NFT All-Stars Podcast | `nft-all-stars-podcast` |
| New Money | `new-money` |
| On Purpose | `on-purpose` |
| Opinionated | `opinionated` |
| Public Keys | `public-keys` |
| The Policy Protocol | `the-policy-protocol` |
| Women Who Web3 | `women-who-web3` |
| Carpe Consensus | `carpe-consensus` |
| Gen C Podcast | `gen-c-podcast` |
| Crypto Talks | `crypto-talks` |
| Mapping Out Eth | `mapping-out-eth` |
| CoinDesk Podcast Network | `coindesk-podcast-network` |

---

## 2.14 Research Report Types (12 tags)

Specialized research report categories.

| Tag | Slug |
|---|---|
| Quarterly Report | `quarterly-report` |
| Annual Report | `annual-report` |
| Market Report | `market-report` |
| Adoption Index | `adoption-index` |
| Exchange Report | `exchange-report` |
| Stablecoin Report | `stablecoin-report` |
| Tokenization Report | `tokenization-report` |
| Network Report | `network-report` |
| Regulatory Report | `regulatory-report` |
| Ecosystem Report | `ecosystem-report` |
| Whitepaper | `whitepaper` |
| Case Study | `case-study` |

---

## 3. Impacts (Sentiment Classification)

Impacts represent the market sentiment or effect of news. Each article can have multiple impacts.

| Impact | Color | Slug | Description |
|---|---|---|---|
| Positive | `green` | `positive` | Bullish news, positive development |
| Negative | `red` | `negative` | Bearish news, negative development |
| Neutral | `zinc` | `neutral` | Neutral information, no clear bias |

---

## 4. Sanity Schema Structure

### Post Document

```typescript
{
  _type: 'post',
  title: string,                    // Article headline
  slug: string,                     // URL slug (auto-generated from title)
  category: reference → Category,   // Single category (required)
  tags: array of references → Tag,  // Multiple tags (2-5 recommended)
  impacts: array of references → Impact,  // Sentiment (1-3 impacts)
  
  author: reference → Author,       // Article author
  publishedAt: datetime,            // Publication timestamp
  updatedAt: datetime,              // Last update timestamp
  
  titleImage: image,                // Featured image
  smallDescription: string,         // Short summary (100-150 chars)
  content: richText,                // Full article body
  
  featured: boolean,                // Show on homepage
  trending: boolean,                // Include in trending section
  
  seo: {
    metaDescription: string,
    keywords: array of strings
  }
}
```

### Category Document

```typescript
{
  _type: 'category',
  name: string,                     // e.g., "Markets"
  slug: string,                     // e.g., "markets"
  description: string,              // Category description
  icon: string,                     // Icon name or emoji
  color: string                     // Tailwind color class
}
```

### Tag Document

```typescript
{
  _type: 'tag',
  name: string,                     // e.g., "Bitcoin"
  slug: string,                     // e.g., "bitcoin"
  category: string,                 // Group (e.g., "tokens")
  description: string               // Optional tag description
}
```

### Impact Document

```typescript
{
  _type: 'impact',
  name: string,                     // e.g., "Positive"
  slug: string,                     // e.g., "positive"
  color: string,                    // e.g., "green"
  description: string
}
```

### Author Document

```typescript
{
  _type: 'author',
  name: string,
  slug: string,
  bio: string,
  avatar: image,
  email: string,
  socialLinks: array of {
    platform: string,
    url: string
  }
}
```

### Video Document

```typescript
{
  _type: 'video',
  title: string,
  slug: string,
  category: reference → Category,
  tags: array of references → Tag,
  
  videoUrl: string,              // YouTube/Vimeo embed URL
  thumbnail: image,              // Video thumbnail
  duration: number,              // Duration in seconds
  
  description: string,           // Video description
  transcript: text,              // Optional: full transcript
  
  host: reference → Author,      // Video host/presenter
  guests: array of references → Author,  // Guest appearances
  
  publishedAt: datetime,
  featured: boolean,
  
  relatedArticles: array of references → Post
}
```

### Podcast Document

```typescript
{
  _type: 'podcast',
  title: string,
  slug: string,
  series: reference → PodcastSeries,  // Podcast show
  tags: array of references → Tag,
  
  audioUrl: string,              // Audio file URL
  duration: number,              // Duration in seconds
  
  description: string,
  transcript: text,              // Optional: full transcript
  
  host: reference → Author,
  guests: array of references → Author,
  
  publishedAt: datetime,
  episodeNumber: number,
  seasonNumber: number,
  
  relatedArticles: array of references → Post
}
```

### PodcastSeries Document

```typescript
{
  _type: 'podcastSeries',
  name: string,                  // e.g., "The Breakdown"
  slug: string,
  description: string,
  logo: image,
  host: reference → Author,
  
  totalEpisodes: number,
  rssUrl: string,
  
  platforms: array of {
    name: string,               // Spotify, Apple Podcasts, etc.
    url: string
  }
}
```

### VideoSeries Document

```typescript
{
  _type: 'videoSeries',
  name: string,                  // e.g., "First Mover"
  slug: string,
  description: string,
  thumbnail: image,
  
  host: reference → Author,
  totalEpisodes: number,
  
  youtubeChannel: string,
  youtubePlaylist: string
}
```

### ResearchReport Document

```typescript
{
  _type: 'researchReport',
  title: string,
  slug: string,
  reportType: string,            // "quarterly", "annual", "market", etc.
  tags: array of references → Tag,
  
  author: reference → Author,
  publishedAt: datetime,
  
  summary: text,                 // Executive summary
  content: richText,             // Full report body
  
  pdfUrl: string,                // Downloadable PDF
  dataUrl: string,               // Optional: downloadable data
  
  keyFindings: array of strings,
  
  featured: boolean,
  downloadCount: number,
  
  relatedReports: array of references → ResearchReport,
  relatedArticles: array of references → Post
}
```

### Newsletter Document

```typescript
{
  _type: 'newsletter',
  title: string,
  slug: string,
  
  description: string,
  frequency: string,             // "daily", "weekly", "monthly"
  
  content: richText,
  
  publishedAt: datetime,
  issueNumber: number,
  
  subscriberCount: number,
  
  relatedArticles: array of references → Post,
  relatedResearch: array of references → ResearchReport
}
```

---

## 4.5 Content Distribution Strategy

### Homepage Layout
- **Hero Section**: 1 featured article + 3 latest articles
- **Markets Section**: Latest market analysis + price updates
- **Video Section**: 4 latest videos from popular shows
- **Podcast Section**: 4 latest podcast episodes
- **Research Section**: 3 latest research reports
- **Opinion Section**: 2 latest opinion pieces
- **Trending**: 8 trending articles (by engagement)

### Category Pages
- **Header**: Category description + featured content
- **Main Feed**: Paginated articles (20 per page)
- **Sidebar**: 
  - Related categories
  - Popular tags in category
  - Latest research in category
  - Video/podcast shows related to category

### Video Hub
- **Featured Videos**: 6 latest videos
- **Video Series**: Grouped by show (First Mover, Markets Daily, etc.)
- **Filters**: By series, date, duration
- **Recommendations**: Related articles + videos

### Podcast Hub
- **Featured Episodes**: 6 latest episodes
- **Podcast Series**: Grouped by show
- **Filters**: By series, date, duration
- **Subscription**: RSS feed links for all platforms

### Research Hub
- **Featured Reports**: 4 latest research reports
- **Report Types**: Filter by quarterly, annual, market, etc.
- **Downloads**: Track popular reports
- **Archive**: Browse by year
- **Related Content**: Articles + videos related to report

### Daybook/Calendar
- **Upcoming Events**: Scheduled crypto events, earnings, etc.
- **Market Calendar**: Economic events, Fed decisions, etc.
- **Conference Coverage**: Consensus, summits, etc.
- **Countdown**: Days until major events

---

## 5. Filtering & Display Rules

### Homepage
- Show: `featured: true` posts
- Limit: 10 most recent
- Sort: `publishedAt` descending

### Category Pages
- Filter: `category` matches selected
- Sort: `publishedAt` descending
- Limit: 20 per page (with pagination)

### Tag Pages
- Filter: `tags` array contains selected tag
- Sort: `publishedAt` descending
- Limit: 20 per page

### Trending Section
- Filter: `trending: true`
- Limit: 8 most recent
- Sort: `publishedAt` descending

### Latest News Widget
- Filter: All posts
- Limit: 20 most recent
- Sort: `publishedAt` descending
- Display: Title + Description (2 lines each) + Sentiment indicator

---

## 6. Content Guidelines

### Category Assignment
- Each post must have exactly ONE category
- Choose the most specific category
- If multiple categories apply, use the primary focus

### Tag Assignment
- Minimum: 2 tags
- Maximum: 5 tags
- Include: 1 token/blockchain tag (if applicable)
- Include: 1 content type tag (if applicable)
- Include: 1 sentiment tag (if applicable)

### Impact Assignment
- Minimum: 1 impact
- Maximum: 3 impacts
- Use `Positive` for bullish news
- Use `Negative` for bearish news
- Use `Neutral` for informational content

### Image Guidelines
- Minimum resolution: 1200x630px
- Format: JPG or PNG
- Size: < 500KB
- Alt text: Required

---

## 7. Example Articles

### Example 1: Bitcoin ETF Approval
```
Title: "Bitcoin ETF Approval Signals Institutional Adoption"
Category: Markets
Tags: Bitcoin, Institutional Investment, Bullish, Feature
Impacts: Positive
Author: John Doe
Published: 2024-01-15
```

### Example 2: Ethereum Shanghai Upgrade
```
Title: "Ethereum Shanghai Upgrade Enables Staking Withdrawals"
Category: Tech
Tags: Ethereum, Staking, Upgrade, Explainer
Impacts: Positive, Neutral
Author: Jane Smith
Published: 2024-02-20
```

### Example 3: SEC Enforcement Action
```
Title: "SEC Files Lawsuit Against Major Crypto Exchange"
Category: Policy
Tags: Regulation, SEC, Lawsuit, Breaking News
Impacts: Negative
Author: Mike Johnson
Published: 2024-03-10
```

### Example 4: DeFi Protocol Hack
```
Title: "$50M Exploit Discovered in Popular DeFi Protocol"
Category: Tech
Tags: DeFi, Hack, Security, Breaking News
Impacts: Negative
Author: Sarah Williams
Published: 2024-03-25
```

---

## 8. Total Tag Count

- **Tokens & Blockchains**: 30 tags
- **Market Activity**: 15 tags
- **DeFi & Infrastructure**: 20 tags
- **Regulation & Compliance**: 18 tags
- **Companies & Institutions**: 25 tags
- **Key Figures**: 20 tags
- **Events & Milestones**: 15 tags
- **Geography**: 20 tags
- **Content Type**: 12 tags
- **Sentiment**: 3 tags
- **Research Topics**: 18 tags
- **Video Show Series**: 25 tags
- **Podcast Series**: 22 tags
- **Research Report Types**: 12 tags

**Total: 275 tags**

---

## 8.5 Total Categories

- **News Categories**: 11 (Markets, Tech, Finance, Policy, Web3, Opinion, Learn, Research, Press Release, News Analysis, Layer 2)
- **Additional Categories**: 3 (Indices, Daybook, Sponsored)

**Total: 14 categories**

---

## 9. Content Creation Workflow

### Article Publishing
1. Writer creates article in Sanity
2. Assign category (required)
3. Add 2-5 tags from available tags
4. Select 1-3 impacts (sentiment)
5. Upload featured image
6. Write SEO meta description
7. Submit for editorial review
8. Editor approves/requests changes
9. Publish (auto-scheduled or immediate)
10. Share to social media

### Video Publishing
1. Upload video to YouTube/Vimeo
2. Create video document in Sanity
3. Embed video URL
4. Add title, description, transcript
5. Tag with series + relevant tags
6. Set featured image (thumbnail)
7. Link related articles
8. Publish

### Podcast Publishing
1. Upload audio to podcast host (Anchor, Transistor, etc.)
2. Create podcast document in Sanity
3. Add audio URL + RSS feed
4. Write episode description + transcript
5. Tag with series + relevant tags
6. Add host + guest information
7. Link related articles
8. Publish (auto-syncs to all platforms)

### Research Report Publishing
1. Create research report document
2. Add report type (quarterly, market, etc.)
3. Upload PDF + data files
4. Write executive summary
5. Add key findings (bullet points)
6. Tag with research topics
7. Link related articles
8. Set featured image
9. Publish + announce in newsletter

---

## 10. Editorial Guidelines

### Tagging Best Practices
- **Always include**: 1 token/blockchain tag (if applicable)
- **Always include**: 1 content type tag
- **Always include**: 1 sentiment tag (for news)
- **Avoid**: Duplicate tags
- **Avoid**: Overly specific tags (use broader categories)
- **Review**: Existing tags before creating new ones

### Category Selection
- **Markets**: Price movements, trading, technical analysis
- **Tech**: Protocol updates, security, infrastructure
- **Finance**: Institutional adoption, TradFi integration
- **Policy**: Regulation, government action, compliance
- **Web3**: dApps, NFTs, smart contracts
- **Opinion**: Analysis, commentary, editorials
- **Research**: Data-driven reports, benchmarks
- **News Analysis**: Deep-dive into breaking news

### Image Requirements
- **Size**: 1200x630px minimum (16:9 aspect ratio)
- **Format**: JPG or PNG
- **File size**: < 500KB
- **Alt text**: Descriptive (required)
- **Branding**: Include logo/watermark if branded content

### SEO Guidelines
- **Title**: 50-60 characters
- **Meta description**: 150-160 characters
- **Keywords**: 3-5 relevant keywords
- **Headings**: Use H2/H3 hierarchy
- **Internal links**: Link to 2-3 related articles
- **External links**: Link to authoritative sources

---

## 9. Implementation Checklist

### Sanity CMS Setup
- [ ] Create all 14 Category documents
- [ ] Create all 275 Tag documents (organized by group)
- [ ] Create 3 Impact documents (Positive, Negative, Neutral)
- [ ] Create Author documents for all team members
- [ ] Create PodcastSeries documents (24+ shows)
- [ ] Create VideoSeries documents (35+ shows)

### Schema Implementation
- [ ] Post schema (articles)
- [ ] Video schema
- [ ] Podcast schema
- [ ] PodcastSeries schema
- [ ] VideoSeries schema
- [ ] ResearchReport schema
- [ ] Newsletter schema
- [ ] Category schema
- [ ] Tag schema
- [ ] Impact schema
- [ ] Author schema

### Frontend Pages
- [ ] Homepage with all content types
- [ ] Category pages with filtering
- [ ] Tag pages with filtering
- [ ] Article detail page
- [ ] Video hub + video detail page
- [ ] Podcast hub + podcast detail page
- [ ] Research hub + research detail page
- [ ] Daybook/calendar page
- [ ] Search functionality (cross-content)
- [ ] Archive pages (by year)

### UI Components
- [ ] Article card (with sentiment indicator)
- [ ] Video card (with duration)
- [ ] Podcast card (with play button)
- [ ] Research card (with download button)
- [ ] Category filter buttons
- [ ] Tag filter chips
- [ ] Breadcrumb navigation
- [ ] Related content sidebar
- [ ] Newsletter signup form
- [ ] Social sharing buttons

### Features
- [ ] Trending articles algorithm
- [ ] Featured content management
- [ ] Related content recommendations
- [ ] Email newsletter integration
- [ ] Podcast RSS feed generation
- [ ] Video playlist creation
- [ ] Search with filters
- [ ] Content analytics tracking
- [ ] SEO optimization
- [ ] Social media integration

---

## 10. Future Enhancements

### Content Features
- [ ] Add author expertise tags
- [ ] Implement related articles (by tag similarity)
- [ ] Create tag-based email newsletters
- [ ] Add reading time estimation
- [ ] Implement article recommendation engine
- [ ] Create category-specific RSS feeds
- [ ] Add tag analytics/popularity tracking
- [ ] Implement tag synonyms (e.g., "BTC" → "Bitcoin")

### Video & Podcast
- [ ] Auto-generate video transcripts (AI)
- [ ] Create video chapters/timestamps
- [ ] Implement video analytics (views, engagement)
- [ ] Add podcast clip extraction
- [ ] Create podcast highlight reels
- [ ] Implement video/podcast recommendations

### Research & Data
- [ ] Create interactive data visualizations
- [ ] Implement research report comparison tool
- [ ] Add downloadable datasets
- [ ] Create research alerts (by topic)
- [ ] Implement research report ratings/reviews
- [ ] Add research methodology documentation

### Community & Engagement
- [ ] User comments on articles
- [ ] Community ratings/voting
- [ ] User-generated research notes
- [ ] Discussion forums by topic
- [ ] Expert Q&A sessions
- [ ] Community polls/surveys

### Monetization
- [ ] Premium research reports
- [ ] Sponsored content management
- [ ] Advertising integration
- [ ] Subscription tiers
- [ ] Paywalled content
- [ ] Affiliate links

### Analytics & Insights
- [ ] Content performance dashboard
- [ ] Reader engagement metrics
- [ ] Topic trend analysis
- [ ] Author performance tracking
- [ ] Video/podcast analytics
- [ ] Research report download tracking
