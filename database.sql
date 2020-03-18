
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "events" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (120) UNIQUE NOT NULL,
    "description" VARCHAR (500) NOT NULL,
    "location" VARCHAR,
    "when" DATE NOT NULL,
    "host-contact" VARCHAR,
    "updates" VARCHAR, 
    "published" BOOLEAN NOT NULL DEFAULT false,
    "flagged" BOOLEAN NOT NULL DEFAULT false
);
