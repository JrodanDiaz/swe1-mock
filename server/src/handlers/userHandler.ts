import { Request, Response } from "express";
import { banUser, clearTable, getUsers } from "../data/queries";

export const getUsersHandler = async (req: Request, res: Response) => {
    const users = await getUsers();
    if("errorMessage" in users){
        res.status(400).send("Internal Server Error")
        return
    }
    res.status(200).send(JSON.stringify(users))
}

export const clearUsersHandler = async (req: Request, res: Response) => {
    await clearTable();
    res.status(200).send("Users table successfully cleared")
}

export const banUserHandler = async (req: Request, res: Response) => {
    const {body} = req
    console.log(`Attemping to ban user: ${body.username}`);
    
    const success = await banUser(body.username)
    console.log(`banUserHandler success: ${success}`);
    
    if(success) {
        res.status(200).send("Successfully banned user")
    }
    else {
        res.status(400).send("Internal Server Error while banning user")
    }
}