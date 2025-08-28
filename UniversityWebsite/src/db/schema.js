import {
    integer,
    pgSchema,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

const schema = pgSchema("university_website");
const roles = schema.enum("userRoles", ["student", "professor", "admin"]);
const users = schema.table("users", {
    id: serial("user_id").primaryKey().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    firstName: varchar("firstName", { length: 256 }).notNull(),
    lastName: varchar("lastName", { length: 256 }).notNull(),
    role: roles("role").default("student").notNull(),
});
const accounts = schema.table("accounts", {
    id: serial("account_id").primaryKey().notNull(),
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256 }).notNull(),
});

export { accounts, schema, users };
