import { implicitLoginSchema, reportsSchema, tokenResponseSchema } from "./schemas";
import { DB_REPORTS_ROW, Report, UserCredentials } from "./types";

export const loginUser = async (user: UserCredentials): Promise<{token: string, errorMessage?: string}> => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });
  if (!response.ok) {
    console.log("error occured while logging in");
  }
  const userData = implicitLoginSchema.safeParse(await response.json());
  if (!userData.success) {
    return {token: "", errorMessage: "Internal Server Error"}
  } 
  if ("errorMessage" in userData.data) {
    return {token: "", errorMessage: userData.data.errorMessage}
  }
  return {token: userData.data.authToken}
};

export async function registerUser(user: UserCredentials): Promise<{token: string, errorMessage?: string}> {
  
  const response = await fetch(`http://localhost:3000/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  
  const tokenData = await response.json()
  const parsedToken = tokenResponseSchema.safeParse(tokenData)
  
  if(!parsedToken.success) {
    return {token: "", errorMessage: "Internal Server Error"}
  }
  if("errorMessage" in parsedToken.data) {
    return {token: "", errorMessage: parsedToken.data.errorMessage}
  }
  
  if (!response.ok) throw new Error("Internal Server Error")
  // return parsedToken.data.authToken
  return {token: parsedToken.data.authToken}
}

export const getReports = async (): Promise<undefined | DB_REPORTS_ROW[]> => {
  try {
    const response = await fetch("http://localhost:3000/reports");
    if (!response.ok) {
      console.log("error occurred while loggine in");
      return;
    }
    const parsedData = reportsSchema.safeParse(await response.json());

    if (!parsedData.success) {
      console.log(`Error parsing reports data: ${parsedData.error}`);
      return;
    }

    return parsedData.data;
  } catch (err) {
    console.log(`Error in getReports: ${err}`);
  }
};

export const deleteReport = async (url: string): Promise<boolean> => {
  console.log("DeleteReport executed");

  try {
    const response = await fetch("http://localhost:3000/reports", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Error in deleteReport");
      return false;
    }

    console.log("response is ok, so return true......");

    return true;
  } catch (err) {
    console.log(`Error in deleteReport: ${err}`);
    return false;
  }
};

export const submitReport = async (report: Report): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:3000/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
      credentials: "include"
    })
    if(!response.ok) {
      return false
    }
    return true
  } catch(err) {
    console.log(`Error in submitReport: ${err}`);
    return false
  }
}

export const validateURL = (url: string): boolean => {
  const regex = /^https:\/\/www\.linkedin\.com\/jobs\/view\//;

  return regex.test(url)
}

export const setJWT = (jwt: string, username: string) => {
  localStorage.setItem("token", jwt)
  localStorage.setItem("username", username)

}

export const getJWT = (): string | null => {
  return localStorage.getItem("token")
}

export const getUsername = (): string => {
  const username = localStorage.getItem("username")
  if(username === null) return ""
  return username
}
