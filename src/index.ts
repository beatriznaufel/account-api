import process from "node:process";
import * as bcrypt from "bcrypt";
import { drizzle } from "drizzle-orm/postgres-js";
import { Hono } from "hono";
import { cors } from "hono/cors";
import postgres from "postgres";
import { z } from "zod";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["POST", "GET", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client);

// Schemas
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Endpoint de login
app.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const validated = loginSchema.parse(body);

    // Buscar usuário pelo email
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, validated.email))
      .limit(1);

    // Se não encontrar o usuário
    if (user.length === 0) {
      return c.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        401,
      );
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(
      validated.password,
      user[0].password,
    );

    if (!isPasswordValid) {
      return c.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        401,
      );
    }

    // Se tudo estiver ok, retorna o usuário (sem a senha)
    const { password, ...userWithoutPassword } = user[0];

    return c.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: "Invalid input data",
          details: error.errors,
        },
        400,
      );
    }

    return c.json(
      {
        success: false,
        error: "An error occurred during login",
      },
      500,
    );
  }
});

app.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const validated = userSchema.parse(body);

    // Primeiro, verificar se o email já existe
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validated.email))
      .limit(1);

    if (existingUser.length > 0) {
      return c.json(
        {
          success: false,
          error: "Email already registered",
        },
        409,
      );
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const newUser = await db
      .insert(users)
      .values({
        email: validated.email,
        password: hashedPassword,
      })
      .returning();

    const { password, ...userWithoutPassword } = newUser[0];

    return c.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: "Invalid input data",
          details: error.errors,
        },
        400,
      );
    }

    if (error instanceof Error && error.message.includes("unique constraint")) {
      return c.json(
        {
          success: false,
          error: "Email already registered",
        },
        409,
      );
    }

    if (error instanceof Error) {
      return c.json(
        {
          success: false,
          error: error.message,
        },
        400,
      );
    }

    return c.json(
      {
        success: false,
        error: "An unknown error occurred",
      },
      500,
    );
  }
});

export default app;
