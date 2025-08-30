import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("Missing DATABASE_URL");
}

export default defineConfig({
    out: "./drizzle",
    schema: "./src/lib/db/schema.ts",
    schemaFilter: ["public", "university_website"],
    dialect: "postgresql",
    dbCredentials: {
        url: DATABASE_URL,
    },
});
