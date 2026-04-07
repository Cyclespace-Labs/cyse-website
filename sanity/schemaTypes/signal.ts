// sanity/schemaTypes/signal.ts
import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export const signal = defineType({
  name: 'signal',
  title: 'Trading Signal',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    // Basic Information
    defineField({
      name: 'analyst',
      title: 'Analyst',
      type: 'reference',
      to: [{ type: 'analystProfile' }],
      description: 'Reference to the analyst who created this signal'
    }),
    defineField({
      name: 'category',
      title: 'Signal Category',
      type: 'reference',
      to: [{ type: 'signalCategory' }],
      description: 'Category for organizing and filtering signals'
    }),
    defineField({
      name: 'imageUrl',
      title: 'Token Image URL',
      type: 'url',
      description: 'URL to the token image/logo',
    }),
    defineField({
      name: 'tokenPair',
      title: 'Token Pair',
      type: 'string',
      description: 'Trading pair (e.g., BTC/USDT)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coingeckoId',
      title: 'CoinGecko ID',
      type: 'string',
      description: 'CoinGecko API ID for the token',
      validation: (rule) => rule.required(),
    }),
    // Trading Details
    defineField({
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: {
        list: [
          { title: 'Long', value: 'LONG' },
          { title: 'Short', value: 'SHORT' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'LONG',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'entryPrice',
      title: 'Entry Price Range',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Entry price range for the trade',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'targetPrices',
      title: 'Target Prices',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Profit target prices in USD',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'stopLoss',
      title: 'Stop Loss',
      type: 'number',
      description: 'Stop loss price in USD',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'exitPrice',
      title: 'Exit Price (USD)',
      type: 'number',
      description: 'Price at which the position was closed',
      hidden: ({ document }: { document: any }) => !['completed', 'target_hit', 'stop_loss'].includes(document?.status)
    }),
    defineField({
      name: 'signalType',
      title: 'Signal Type',
      type: 'string',
      options: {
        list: [
          { title: 'Breakout', value: 'breakout' },
          { title: 'Breakdown', value: 'breakdown' },
          { title: 'Support Bounce', value: 'support' },
          { title: 'Resistance Rejection', value: 'resistance' },
          { title: 'Trend Continuation', value: 'continuation' },
          { title: 'Trend Reversal', value: 'reversal' },
          { title: 'Divergence', value: 'divergence' },
          { title: 'News Catalyst', value: 'news' },
          { title: 'Fundamental', value: 'fundamental' },
          { title: 'Other', value: 'other' }
        ]
      },
      description: 'Type of trading signal'
    }),
        defineField({
      name: 'positionSize',
      title: 'Recommended Position Size (%)',
      type: 'number',
      validation: (rule) => rule.min(0).max(100),
      description: 'Recommended position size as percentage of portfolio'
    }),
    defineField({
      name: 'indicators',
      title: 'Technical Indicators',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'RSI', 'MACD', 'Bollinger Bands', 'Moving Averages', 'Volume', 'Stochastic',
          'Fibonacci', 'Ichimoku', 'Williams %R', 'CCI', 'ADX', 'ATR'
        ]
      }
    }),
    defineField({
      name: 'chartPattern',
      title: 'Chart Pattern',
      type: 'string',
      options: {
        list: [
          'Head and Shoulders', 'Double Top', 'Double Bottom', 'Triangle', 'Wedge',
          'Flag', 'Pennant', 'Cup and Handle', 'Rounding Bottom', 'Rounding Top',
          'Channel', 'Other'
        ]
      }
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe',
      type: 'string',
      options: {
        list: [
          { title: 'Scalping (minutes)', value: 'scalping' },
          { title: 'Short-term (hours)', value: 'short' },
          { title: 'Medium-term (days)', value: 'medium' },
          { title: 'Long-term (weeks)', value: 'long' },
          { title: 'Swing (weeks-months)', value: 'swing' }
        ]
      },
      initialValue: 'medium'
    }),
    defineField({
      name: 'riskLevel',
      title: 'Risk Level',
      type: 'string',
      options: {
        list: [
          { title: 'Very Low', value: 'very_low' },
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Very High', value: 'very_high' }
        ]
      },
      initialValue: 'medium'
    }),
    defineField({
      name: 'trend',
      title: 'Overall Market Trend',
      type: 'string',
      options: {
        list: [
          { title: 'Bullish', value: 'bullish' },
          { title: 'Bearish', value: 'bearish' },
          { title: 'Sideways', value: 'sideways' },
          { title: 'Mixed', value: 'mixed' }
        ]
      }
    }),
    defineField({
      name: 'volatility',
      title: 'Volatility Level',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Extreme', value: 'extreme' }
        ]
      }
    }),
    defineField({
      name: 'volume',
      title: 'Volume Level',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Normal', value: 'normal' },
          { title: 'High', value: 'high' },
          { title: 'Extreme', value: 'extreme' }
        ]
      }
    }),
    defineField({
      name: 'confidence',
      title: 'Confidence Level',
      type: 'number',
      validation: (rule) => rule.min(1).max(10),
      description: 'Signal confidence level (1-10)'
    }),
    defineField({
      name: 'priority',
      title: 'Signal Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Critical', value: 'critical' }
        ]
      },
      initialValue: 'medium',
      description: 'Priority level for signal notifications'
    }),
    // Analysis & Content
    defineField({
      name: 'rationale',
      title: 'Trading Rationale',
      type: 'text',
      description: 'Detailed explanation for this trade signal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedNews',
      title: 'Related News',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'news' }],
        }),
      ],
      description: 'News articles related to this signal',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorization and filtering'
    }),
    // Metadata
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Filled', value: 'filled' },
          { title: 'Target Hit', value: 'target_hit' },
          { title: 'Stop Loss Hit', value: 'stop_loss' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Expired', value: 'expired' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'active',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'accessLevel',
      title: 'Access Level',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Premium', value: 'premium' },
          { title: 'Pro', value: 'pro' },
          { title: 'Analyst Tier', value: 'analyst' },
          { title: 'Admin Only', value: 'admin' }
        ]
      },
      initialValue: 'public',
      description: 'Who can access this signal'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Signal',
      type: 'boolean',
      initialValue: false,
      description: 'Whether to feature this signal prominently'
    }),
    defineField({
      name: 'isPremium',
      title: 'Premium Signal (Legacy)',
      type: 'boolean',
      initialValue: false,
      hidden: true,
      description: 'Legacy field - use accessLevel instead'
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      validation: (rule) => rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15
      }
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  
  // Preview configuration
  preview: {
    select: {
      title: 'tokenPair',
      direction: 'direction',
      status: 'status',
      createdAt: 'createdAt',
    },
    prepare(selection) {
      const { title, direction, status, createdAt } = selection;
      return {
        title: title,
        subtitle: `${direction || 'No direction'} • ${status || 'No status'} • ${new Date(createdAt).toLocaleDateString()}`,
      };
    },
  },
}); 
