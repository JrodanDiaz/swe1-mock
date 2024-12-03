import { implicitLoginSchema, reportsSchema } from "./schemas";
import { DB_REPORTS_ROW, Report, UserCredentials } from "./types";

export const loginUser = async (user: UserCredentials) => {
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
  if (!userData.success) throw new Error("Internal Server Error");
  if ("errorMessage" in userData.data) throw new Error(userData.data.errorMessage);
  return userData.data.authToken;
};

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
