import { Request, Response } from "express";
import { deleteReport, getReports } from "../data/queries";

export const getReportsHandler = async (req: Request, res: Response) => {
    const reports = await getReports();
    if("errorMessage" in reports){
        res.status(400).send("Internal Server Error")
        return
    }
    res.status(200).send(JSON.stringify(reports))
}

export const deleteReportHandler = async (req: Request, res: Response) => {
    const {body} = req
    console.log(`body url = ${body.url}`);
    
    const success = await deleteReport(body.url)
    if(!success) {
        console.log("Error occurred while deleting report");
       res.status(400).send("Internal Server Error");
       return 
    }
    res.status(200)
}