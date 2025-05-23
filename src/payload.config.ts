// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { s3Storage } from '@payloadcms/storage-s3'

// import { getCustomPosts, getSimplifiedPosts } from './routes/posts'

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
  // db: sqliteAdapter({
  //   client: {
  //     url: process.env.DATABASE_URI || '',
  //   },
  // }),
  db: vercelPostgresAdapter({
    // 自动使用 process.env.POSTGRES_URL，如果没有提供选项
    // 或者您可以手动指定连接字符串
    pool: {
      connectionString: process.env.DATABASE_URL, // 使用 PostgreSQL 连接字符串
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true, // 指定使用 R2 存储的集合
        // 'media-with-prefix': {
        //   prefix: 'my-prefix', // 可选：为上传的文件添加前缀
        // },
      },
      bucket: process.env.R2_BUCKET, // R2 存储桶名称
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID, // R2 访问密钥 ID
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY, // R2 秘密访问密钥
        },
        region: 'auto', // R2 区域
        endpoint: process.env.R2_ENDPOINT, // R2 端点
      },
    }),
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
