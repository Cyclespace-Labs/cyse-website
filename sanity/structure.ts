import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Cyclespace CMS')
    .items([

      // ─── News ───────────────────────────────────────────────────────
      S.listItem()
        .title('News')
        .child(
          S.list()
            .title('News')
            .items([
              S.documentTypeListItem('news').title('All Articles'),
            ])
        ),

      S.divider(),

      // ─── Research ───────────────────────────────────────────────────
      S.listItem()
        .title('Research')
        .child(
          S.list()
            .title('Research')
            .items([
              S.documentTypeListItem('research').title('Research Reports'),
            ])
        ),

      S.divider(),

      // ─── Video ──────────────────────────────────────────────────────
      S.listItem()
        .title('Video')
        .child(
          S.list()
            .title('Video')
            .items([
              S.documentTypeListItem('video').title('All Videos'),
              S.documentTypeListItem('videoSeries').title('Video Series'),
            ])
        ),

      S.divider(),

      // ─── Podcast ────────────────────────────────────────────────────
      S.listItem()
        .title('Podcast')
        .child(
          S.list()
            .title('Podcast')
            .items([
              S.documentTypeListItem('podcast').title('All Episodes'),
              S.documentTypeListItem('podcastSeries').title('Podcast Series'),
            ])
        ),

      S.divider(),

      // ─── Newsletter ─────────────────────────────────────────────────
      S.documentTypeListItem('newsletter').title('Newsletters'),

      S.divider(),

      // ─── Taxonomy ───────────────────────────────────────────────────
      S.listItem()
        .title('Taxonomy')
        .child(
          S.list()
            .title('Taxonomy')
            .items([
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('tag').title('Tags'),
              S.documentTypeListItem('impact').title('Impacts / Sentiment'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),

      S.divider(),

      // ─── Signals & Tokens ───────────────────────────────────────────
      S.listItem()
        .title('Signals & Tokens')
        .child(
          S.list()
            .title('Signals & Tokens')
            .items([
              S.documentTypeListItem('signal').title('Signals'),
              S.documentTypeListItem('signalCategory').title('Signal Categories'),
              S.documentTypeListItem('token').title('Tokens'),
              S.documentTypeListItem('analystProfile').title('Analyst Profiles'),
            ])
        ),
    ])
