import { execSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import 'dotenv/config'

const url = process.env['DATABASE_URL']
if (!url) throw new Error('DATABASE_URL not set')

const outDir = join(import.meta.dirname, '..', 'exports')
const outFile = join(outDir, 'expense_tracker.sql')

mkdirSync(outDir, { recursive: true })

console.log('Exporting database...')
execSync(`pg_dump "${url}" -f "${outFile}"`, { stdio: 'inherit' })
console.log(`Exported to ${outFile}`)
