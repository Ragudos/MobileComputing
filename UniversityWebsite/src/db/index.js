import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../consts";

const db = drizzle(DATABASE_URL);

export default db;
