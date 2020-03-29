--create database "mpls_website"

--user table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 1
);

--event table--there are some restrictions on character lengths and required inputs on DOM but not in db
CREATE TABLE "events" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "shortDescription" VARCHAR,
    "startTime" TIMESTAMP,
    "endTime" TIMESTAMP,
    "startDateString" VARCHAR,
    "startTimeString" VARCHAR,
    "endDateString" VARCHAR,
    "endTimeString" VARCHAR,
    "location" VARCHAR,
    "fullDescription" VARCHAR,
    "posterLink" VARCHAR,
    "updates" VARCHAR, 
    "hostContact" VARCHAR,
    "hostContactPublic" BOOLEAN NOT NULL DEFAULT FALSE,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "flagged" BOOLEAN NOT NULL DEFAULT false
);

--notes table- references user table and events table
CREATE TABLE "notes" (
	"id" SERIAL PRIMARY KEY,
	"text" VARCHAR NOT NULL,
	"event_id" INT REFERENCES "events",
	"user_id" INT REFERENCES "user",
	"time" TIMESTAMP 
);

--tags table
CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"tagName" VARCHAR NOT NULL
);


--notes_tags table references events and tags tables
CREATE TABLE "events_tags" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "events",
	"tag_id" INT REFERENCES "tags"
);