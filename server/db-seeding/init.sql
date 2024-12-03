\echo 'creating users table'

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    passhash VARCHAR(255) NOT NULL
);

\echo 'creating reports table'

CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    job_url VARCHAR(255) UNIQUE NOT NULL,
    report_type VARCHAR(255),
    report_reason VARCHAR(255)

);

\echo 'Finished creating users table'
\dt
