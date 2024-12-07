import { Request, Response } from "express";
import { createReport, deleteReport, getReports } from "../data/queries";
import { reportSchema } from "../schemas";

export const getReportsHandler = async (req: Request, res: Response) => {
  const reports = await getReports();
  if ("errorMessage" in reports) {
    res.status(400).send("Internal Server Error");
    return;
  }
  res.status(200).send(JSON.stringify(reports));
};

export const deleteReportHandler = async (req: Request, res: Response) => {
  const { body } = req;
  console.log(`body url = ${body.url}`);

  const success = await deleteReport(body.url);
  if (!success) {
    console.log("Error occurred while deleting report");
    res.status(400).send("Internal Server Error");
    return;
  }
  res.status(200);
};

export const submitReportHandler = async (req: Request, res: Response) => {
  const { body } = req;

  const parsedReport = reportSchema.safeParse(body);

  if (!parsedReport.success) {
    console.log(`Error parsing report: ${parsedReport.error}`);
    res.status(400).send("Error Parsing JSON");
    return;
  }

  const success = await createReport(parsedReport.data);
  if (!success) {
    console.log(`Error creating report`);
    res.status(400).send("Internal Server Error");
    return;
  }
  console.log("succesfully created report");
  res.status(200).send("Success");
};
