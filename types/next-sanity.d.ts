declare module 'next-sanity/studio' {
  export { NextStudio } from 'next-sanity';
  export const metadata: any;
  export const viewport: any;
}

declare module 'next-sanity/live' {
  export const defineLive: (config: any) => any;
}