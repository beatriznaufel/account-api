import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { z } from 'zod';
import { users } from './db/schema';
import * as bcrypt from 'bcrypt';

const app = new Hono();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client);

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

app.post('/register', async (c) => {
  try {
    const body = await c.req.json();
    const validated = userSchema.parse(body);
    
    const hashedPassword = await bcrypt.hash(validated.password, 10);
    
    const newUser = await db.insert(users).values({
      email: validated.email,
      password: hashedPassword,
    }).returning();

    const { password, ...userWithoutPassword } = newUser[0];
    
    return c.json({ 
      success: true, 
      user: userWithoutPassword 
    });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ success: false, error: error.message }, 400);
    }
    return c.json({ success: false, error: 'An unknown error occurred' }, 400);
  }
});

export default app;