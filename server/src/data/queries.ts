import { pg_pool } from "./pg-pool";
import { UserCredentials, ErrorMessage, DB_USERS_ROW, DB_REPORTS_ROW, Report } from "../types";
import { QueryResult } from "pg";

export const getUsers = async (): Promise<any[] | ErrorMessage> => {
  try 
  {
    const users = await pg_pool.query("SELECT * FROM public.users");
    if(users.rows.length === 0) return {errorMessage: "Users table is empty"}
    return users.rows;
  } 
  catch(err) 
  {
    console.log(`err in getUsers: ${err}`);
    return {errorMessage: "Internal Server Error"}
  }
};

export const getReports = async (): Promise<DB_REPORTS_ROW[] | ErrorMessage> => {
  try 
  {
    const reports: QueryResult<DB_REPORTS_ROW> = await pg_pool.query("SELECT * FROM public.reports");
    if(reports.rows.length === 0) return {errorMessage: "Users table is empty"}
    return reports.rows;
  } 
  catch(err) 
  {
    console.log(`err in getReports: ${err}`);
    return {errorMessage: "Internal Server Error"}
  }
};

export const deleteReport = async (url: string): Promise<boolean> => {
  try {
    await pg_pool.query(
      "DELETE FROM reports where job_url = $1",
      [url]
    );
    return true
  } catch(err) {
    console.log(`err in createUser: ${err}`);
    return false 
  }
};

export const createReport = async(report: Report): Promise<boolean> => {
  try {
    await pg_pool.query("INSERT INTO reports (reporter, job_url, report_type, report_reason) VALUES ($1, $2, $3, $4)", [report.reporter, report.job_url, report.report_type, report.report_reason])
    return true
  } catch(err) {
    console.log(`Error in createReport: ${err}`);
    return false
    
  }
} 

export const findByUsername = async (username: string): Promise<UserCredentials | ErrorMessage > => {
  try 
  {
    const query = "SELECT * FROM users WHERE username = $1";
    const res = await pg_pool.query(query, [username]);
    if (res.rows.length === 0)
      return { errorMessage: "No users found with that username" };
    const user: UserCredentials = {
      username: res.rows[0].username,
      password: res.rows[0].password,
    };
    return user;
  } 
  catch (err) 
  {
    console.log(err);
    return { errorMessage: "Internal server error" };
  }
};

export const userExists = async (username: string): Promise<boolean> => {
  const query = "SELECT * FROM users WHERE username = $1";
  const res = await pg_pool.query(query, [username]);
  return res.rows.length !== 0;
};

export const createUser = async (user: UserCredentials): Promise<boolean> => {
  try {
    await pg_pool.query(
      "INSERT INTO users (username, passhash) VALUES ($1, $2)",
      [user.username, user.password]
    );
    return true
  } catch(err) {
    console.log(`err in createUser: ${err}`);
    return false 
  }
};

export const getUserIdFromUsername = async (
  username: string
): Promise<string> => {
  const res = await pg_pool.query(
    "SELECT id FROM users WHERE username = $1",
    [username]
  );
  if (res.rows[0].length === 0) return "";
  return res.rows[0].id as string;
};

export const validateUser = async (user: UserCredentials): Promise<boolean> => {
  console.log(`validateUser, user = ${JSON.stringify(user)}`)
  const users: QueryResult<DB_USERS_ROW> = await pg_pool.query("SELECT passhash FROM users where username = $1", [user.username])
  if(users.rows.length === 0) {
    return false
  }
  return users.rows[0].passhash === user.password
}

// export const createTable = async () => {
//   try {
//     const res = await pg_pool.query(
//       "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(100) NOT NULL, passhash VARCHAR(100) NOT NULL)"
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

export const clearTable = async () => {
  try {
    await pg_pool.query("DELETE FROM users");
  } catch(err){
    console.log(`err occurred in clearTable: ${err}`);
    
  }
}
