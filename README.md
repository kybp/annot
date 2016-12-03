# Annot

Annot offers a simple way to share comments on specific parts of some
pieces of text. Annot is written in Typescript, using React, Redux,
Express, and PostgreSQL.

# Building and Running

From the root directory, run `npm i` or `yarn`. This will pull in the
dependencies, build the project, and prepare the database. Note that
Postgres must be running for this step to work. Annot will look for a
database URL in the environment variable `$DATABASE_URL`, or if there
isn't one there it will try `postgres://localhost:5432`. Once Annot is
installed, you can run it with `npm start`; by default it will run on
port 3000, but this can be customised with the `$PORT` environment
variable.

Additionally, the following commands are available:

    npm run build - recompile the Typescript sources
    npm run clean - delete all build output and dependencies
    npm run doc   - generate source code documentation with Typedoc
    npm run lint  - lint the source files with TSLint
    npm run test  - run the test suite
