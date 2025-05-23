// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { getCustomPosts, getSimplifiedPosts } from './routes/posts'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Posts from './collections/Posts'
import Categories from './collections/Categories'
import Tags from './collections/Tags'
import SiteConfig from './globals/SiteConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories, Tags],
  globals: [SiteConfig],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  // routes: {
  //   api: {
  //     custom: {
  //       posts: {
  //         get: getCustomPosts,
  //         getSimplified: getSimplifiedPosts,
  //       },
  //     },
  //   },
  // },
})
