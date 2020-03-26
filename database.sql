
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
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
    "short-description" VARCHAR,
    "start-time" TIMESTAMP,
    "end-time" TIMESTAMP,
    "location" VARCHAR,
    "full-description" VARCHAR,
    "poster-link" VARCHAR,
    "updates" VARCHAR, 
    "host-contact" VARCHAR,
    "host-contact-public" BOOLEAN NOT NULL DEFAULT FALSE,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "flagged" BOOLEAN NOT NULL DEFAULT false
);


--example data
INSERT INTO "events" ("name", "short-description", "start-time", "end-time","location", "full-description", "poster-link","updates", "host-contact","host-contact-public")
VALUES ('JelloFest 2020', 'a party where you can bring a jello if you want', '2020-02-15 19:00:00', '2020-02-16 01:00:00', 'my house', 'a jello potluck/art event- all guests can bring a jello of some sort! the categories are tastiest, most creative, jiggliest, most disturbing, and best of show', 'url-to-poster', 'link to updating event page','111-222-3333', 'false'),

('Pet Video Call', 'a call for pets and their people', '2020-03-19 17:30:00', null, 'the virtual classroom', 'bring your pet to say hi after class!', '', 'text the host (number below)','111-222-3333', 'true'),

('South MPLS Food Distro', '', '2020-03-25 13:00:00', '2020-03-25 16:00:00', 'Matthews Park', 'Everyone is welcome to this food distribution event. Unlike other events where you can select your own food, volunteers following social distancing and wearing gloves will load a box for you. If you want to volunteer, contact the 444-555-6666', '', 'link to org website','444-555-6666', 'true');
