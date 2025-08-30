import {
    GENDERS,
    UNIVERSITY_PROGRAMS,
    USER_ROLES,
} from "@university-website/shared";
import {
    boolean,
    foreignKey,
    integer,
    pgSchema,
    serial,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/pg-core";

const schema = pgSchema("university_website");

const universityPrograms = schema.enum(
    "university_programs",
    UNIVERSITY_PROGRAMS
);
const userRoles = schema.enum("user_roles", USER_ROLES);
const gender = schema.enum("gender", GENDERS);

const users = schema.table("users", {
    id: serial("user_id").primaryKey().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    firstName: varchar("firstName", { length: 256 }).notNull(),
    lastName: varchar("lastName", { length: 256 }).notNull(),
    role: userRoles("role").default("student").notNull(),
    gender: gender("gender").notNull(),
    universityProgram: universityPrograms("university_program").notNull(),
    yearLevel: integer("year_level").notNull(),
    graduationYear: integer("graduation_year").notNull(),
    dateOfBirth: timestamp("date_of_birth").notNull(),
});

const accounts = schema.table(
    "accounts",
    {
        id: serial("account_id").primaryKey().notNull(),
        userId: integer("user_id")
            .references(() => users.id)
            .notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
        email: varchar("email", { length: 256 }).unique().notNull(),
        password: varchar("password", { length: 256 }).notNull(),
    },
    (t) => [
        foreignKey({
            columns: [t.userId],
            foreignColumns: [users.id],
            name: "fk_user_account",
        }),
        uniqueIndex("email_index").on(t.email),
    ]
);

const accountVerification = schema.table(
    "account_verifications",
    {
        id: serial("account_verification_id").primaryKey().notNull(),
        accountId: integer("account_id")
            .references(() => accounts.id)
            .unique()
            .notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
        verified: boolean("verified").default(false).notNull(),
        expiresOn: timestamp("expires_on").notNull(),
        verificationToken: varchar("verification_token", {
            length: 256,
        }).notNull(),
    },
    (t) => [
        foreignKey({
            columns: [t.accountId],
            foreignColumns: [accounts.id],
            name: "fk_account_verification",
        }),
    ]
);

export {
    accounts,
    accountVerification,
    gender,
    schema,
    universityPrograms,
    userRoles,
    users,
};
