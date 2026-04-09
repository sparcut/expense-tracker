import { execSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import 'dotenv/config'

const url = process.env['DATABASE_URL']
if (!url) throw new Error('DATABASE_URL not set')

const outDir = join(__dirname, '..', 'exports')
const outFile = join(outDir, 'expense_tracker.sql')

mkdirSync(outDir, { recursive: true })

console.log('Exporting database...')
const pgDump = process.platform === 'win32'
  ? '"C:\\Program Files\\PostgreSQL\\18\\bin\\pg_dump.exe"'
  : 'pg_dump'
execSync(`${pgDump} "${url}" -f "${outFile}"`, { stdio: 'inherit' })
console.log(`Exported to ${outFile}`)
