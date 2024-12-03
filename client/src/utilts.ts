import { implicitLoginSchema } from "./schemas";
import { UserCredentials } from "./types";

export const loginUser = async (user: UserCredentials) => {
     const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include"
  });
  if (!response.ok) {
    console.log("error occured while logging in");
  }
  const userData = implicitLoginSchema.safeParse(await response.json())
  if(!userData.success) throw new Error("Internal Server Error")
  if("errorMessage" in userData.data) throw new Error(userData.data.errorMessage)
  return userData.data.authToken
}