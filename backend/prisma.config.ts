import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

export default defineConfig({
  schema: path.join(import.meta.dirname, 'prisma/schema.prisma'),
  datasource: {
    url: process.env['DATABASE_URL']!,
  },
  migrate: {
    async adapter(env: Record<string, string | undefined>) {
      return new PrismaPg({ connectionString: env['DATABASE_URL']! })
    },
  },
})
