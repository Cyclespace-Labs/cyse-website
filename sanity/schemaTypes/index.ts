import { type SchemaTypeDefinition } from 'sanity'
import { signal } from './signal'
import { token } from './token'
import { analystProfile } from './analystProfile'
import { author } from './author'
import { news } from './news'
import { impact } from './impact'
import { tag } from './tag'
import { category } from './category'
import { research } from './research'
import { video } from './video'
import { videoSeries } from './videoSeries'
import { podcast } from './podcast'
import { podcastSeries } from './podcastSeries'
import { newsletter } from './newsletter'
import { signalCategory } from './signalCategory'
import { blockContentType } from './blockContentType'
import { seo } from './seo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // ─── Shared taxonomy ────────────────────────────
    author,
    category,
    tag,
    impact,

    // ─── News ───────────────────────────────────────
    news,

    // ─── Research ───────────────────────────────────
    research,

    // ─── Video ──────────────────────────────────────
    videoSeries,
    video,

    // ─── Podcast ────────────────────────────────────
    podcastSeries,
    podcast,

    // ─── Newsletter ─────────────────────────────────
    newsletter,

    // ─── Signals & Tokens ───────────────────────────
    analystProfile,
    signal,
    signalCategory,
    token,

    // ─── Shared utilities ───────────────────────────
    blockContentType,
    seo,
  ],
}
