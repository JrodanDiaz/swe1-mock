import { Request, Response } from "express";
import { authCookiesSchema, userCredentialsSchema } from "../schemas";
import { validateUser } from "../data/queries";
import { createJwt, jwtCookieOptions } from "../auth/jwt";
import { isLoggedIn } from "../auth/utils";
import { log } from "console";

export const loginHandler = async (req: Request, res: Response) => {
    const {body} = req
    console.log(`IN LOGIN HANDLER: ${JSON.stringify(body)}`)
    
    if(isLoggedIn(req)) {
        res.sendStatus(307)
        return
    }
    console.log("past logged in")
    
    const parsedBody = userCredentialsSchema.safeParse(body)
    if(!parsedBody.success || parsedBody.error) {
        res.status(400).send("Invalid JSON request")
        return
    }
    console.log(`past parsed ${parsedBody.data.username}`)

    const loginSuccess = await validateUser(parsedBody.data)
    if(!loginSuccess){
        res.status(401).send("Invalid credentials")
        return
    }
    console.log("past loginSuccess")
    
    const jwt = createJwt(parsedBody.data.username)
    res.cookie("authToken", jwt, jwtCookieOptions)
    res.status(200).json({authToken: jwt, username: parsedBody.data.username})
}