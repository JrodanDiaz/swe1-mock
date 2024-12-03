import { Request, Response } from "express";
import { getReports } from "../data/queries";

export const getReportsHandler = async (req: Request, res: Response) => {
    const reports = await getReports();
    if("errorMessage" in reports){
        res.status(400).send("Internal Server Error")
        return
    }
    res.status(200).send(JSON.stringify(reports))
}