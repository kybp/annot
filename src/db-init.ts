import * as pgPromise from 'pg-promise'

const pgp = pgPromise()
const url = process.env.DATABASE_URL || 'postgres://localhost:5432/annot'
const db  = pgPromise()(url)

db.none(`
CREATE TABLE IF NOT EXISTS uploads(
    id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS annotations(
    id        SERIAL PRIMARY KEY,
    title     TEXT NOT NULL,
    body      TEXT NOT NULL,
    upload_id INTEGER NOT NULL REFERENCES uploads
);

CREATE TABLE IF NOT EXISTS snippets(
    id        SERIAL PRIMARY KEY,
    title     TEXT NOT NULL,
    body      TEXT NOT NULL,
    upload_id INTEGER NOT NULL REFERENCES uploads
);

CREATE TABLE IF NOT EXISTS selections(
    id            SERIAL PRIMARY KEY,
    start         INTEGER NOT NULL,
    finish        INTEGER NOT NULL,
    annotation_id INTEGER NOT NULL REFERENCES annotations,
    snippet_id    INTEGER NOT NULL REFERENCES snippets,
    upload_id     INTEGER NOT NULL REFERENCES uploads
);
`).then(() => pgp.end())
  .catch((error) => {
    pgp.end()
    console.error(error)
    process.exit(1)
  })
