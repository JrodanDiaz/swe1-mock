export type UserCredentials = {
    username: string,
    password: string
}

export type DB_REPORTS_ROW = {
    id: number,
    reporter: string,
    job_url: string,
    report_type: string,
    report_reason: string
}

export type Report = {
    reporter: string,
    job_url: string,
    report_type: string,
    report_reason: string
}

export type User = {
    username: string,
    isAdmin: boolean,
    reportCount: number
}
