import { type SchemaTypeDefinition } from 'sanity'
import { signal } from './signal'
import { token } from './token'
import { analystProfile } from './analystProfile'
import { author } from './author'
import { news } from './news'
import { impact } from './impact'
import { tag } from './tag'
import { research } from './research'
import { signalCategory } from './signalCategory'
import { category } from './category'
import { blockContentType } from './blockContentType'
import { seo } from './seo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    author, 
    analystProfile, 
    news,
    research, 
    impact,
    tag,
    category,
    signal, 
    token,   
    signalCategory,  
    blockContentType, 
    seo,
  ],
}
