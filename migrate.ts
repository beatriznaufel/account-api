import process from 'node:process'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined')
}

const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 })

async function main() {
  try {
    const db = drizzle(migrationClient)
    await migrate(db, { migrationsFolder: 'drizzle' })
    process.exit(0)
  }
  catch (error) {
    console.error('Error performing migrations:', error)
    process.exit(1)
  }
}

main()
