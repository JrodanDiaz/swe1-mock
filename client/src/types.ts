export type UserCredentials = {
    username: string,
    password: string
}

export type DB_REPORTS_ROW = {
    id: number,
    job_url: string,
    report_type: string,
    report_reason: string
}

export type Report = {
    job_url: string,
    report_type: string,
    report_reason: string
}