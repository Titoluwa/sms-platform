import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
    var __prisma: PrismaClient | undefined;
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma: PrismaClient =
    globalThis.__prisma ??
    new PrismaClient({
        adapter,
        log:
        process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalThis.__prisma = prisma;
}

export default prisma;