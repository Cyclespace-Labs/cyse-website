# Cyclespace Exchange Website

## Overview
Cyclespace Exchange Website is a modern Next.js marketing and content platform for a crypto trading and market intelligence brand. The project presents a polished frontend experience for a decentralized exchange ecosystem, while also integrating editorial, research, and market-data workflows that support a broader media and insights layer.

The site combines:
- a conversion-focused landing page for a crypto exchange brand
- market and prediction widgets sourced from live external APIs
- a Sanity-powered CMS for content publishing and editorial workflow
- AI-assisted content generation for articles, newsletters, and research outputs

## Core Purpose
The platform is designed to position Cyclespace as a trusted destination for:
- fast, secure, low-friction crypto trading
- market analysis and research content
- prediction market visibility and trading sentiment
- educational and editorial coverage of crypto and macro markets

## Key Features
### 1. Conversion-focused landing experience
The homepage includes hero sections, product highlights, feature blocks, chain coverage, rewards, timeline storytelling, and latest news modules. The visual design emphasizes trust, speed, and exchange performance.

### 2. Prediction market integration
The application exposes a server route at `app/api/predictions/route.ts` that fetches active market events from the Polymarket Gamma API and transforms the response into a simplified JSON structure for the frontend. This is used to display live prediction-market cards such as category, title, options, and volume.

### 3. CMS-backed editorial system
The project uses Sanity as its content backend. This enables structured storage and management of articles, newsletters, categories, and market-linked content for the website.

### 4. AI-powered content pipeline
The repository includes scripts and prompts designed to generate market reports, research, and newsletter content with AI. These tools help automate content creation while keeping editorial structures compatible with the Sanity CMS.

### 5. Data and publishing workflow
Scripts in the project support:
- seeding CMS content
- generating article/research/newsletter content
- uploading media assets to Sanity
- orchestrating AI-assisted publishing workflows

## Technology Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Sanity CMS
- Google Generative AI
- Polymarket Gamma API
- Node.js scripts for automation and content ingestion

## Project Structure
- `app/` – Next.js application pages and API routes
- `components/` – reusable UI and landing-page sections
- `sanity/` – CMS schema and configuration
- `scripts/` – AI/content generation and data pipeline utilities
- `docs/` – project documentation and operational notes
- `public/` – static assets

## Technical Notes
The app uses an App Router architecture with server-side API endpoints and client-facing marketing components. It is built to combine a polished user experience with real-time market data and a scalable content platform.

The prediction API route is an example of the project’s practical architecture: it fetches external market data, sanitizes and reshapes it for UI use, and returns a lightweight payload optimized for frontend rendering.

## Project Goal
Cyclespace Exchange Website aims to be both a brand showcase and a content-driven market platform: an experience that attracts users, keeps them informed, and supports a data-rich crypto ecosystem.
