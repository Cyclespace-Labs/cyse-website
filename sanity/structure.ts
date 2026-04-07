import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('news').title('News'),
      S.documentTypeListItem('author').title('News Author'),
      S.documentTypeListItem('category').title('category'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['news', 'author', 'category'].includes(item.getId()!),
      ),
    ])
