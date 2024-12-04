\echo 'Seeding database'

INSERT INTO 
    users (
        username,
        passhash,
        banned
    ) 
VALUES
    (
        'jordan',
        'jordan',
        FALSE
    ),
    (
        'admin',
        'admin',
        FALSE
    ),
    (
        'lebron',
        'lebron',
        FALSE
    ),
    (
        'pge',
        'pge',
        TRUE
    );

INSERT INTO
    reports (
        reporter,
        job_url,
        report_type,
        report_reason
    )
VALUES
    (
        'System',
        'https://www.linkedin.com/jobs/view/4026418962',
        'Scam Job',
        'This job has a salary that is suspiciously high.'
    ),
    (
        'System',
        'https://www.linkedin.com/jobs/view/4064967420',
        'Ghost Job',
        'This company is not hiring on their official website.'
    );

\echo 'finished seeding db GOD'
SELECT * FROM users
-- SELECT * FROM reports