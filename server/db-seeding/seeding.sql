\echo 'Seeding database'

INSERT INTO 
    users (
        username,
        passhash
    ) 
VALUES
    (
        'jordan',
        'Shrekt123'
    ),
    (
        'admin',
        'admin'
    ),
    (
        'bourbon',
        'Necromancy'
    ),
    (
        'darklordpge',
        'soaked-in-honey'
    );

INSERT INTO
    reports (
        job_url,
        report_type,
        report_reason
    )
VALUES
    (
        'https://www.linkedin.com/jobs/view/4026418962',
        'Scam Job',
        'This job has a salary that is suspiciously high.'
    ),
    (
        'https://www.linkedin.com/jobs/view/4064967420',
        'Ghost Job',
        'This company is not hiring on their official website.'
    );

\echo 'finished seeding db GOD'
-- SELECT * FROM users
SELECT * FROM reports