import { useEffect, useState } from "react";
import { deleteReport, getReports } from "../utilts";
import { DB_REPORTS_ROW } from "../types";
import Navbar from "./Navbar";

export default function AdminPage() {
  const [reports, setReports] = useState<DB_REPORTS_ROW[] | undefined>(undefined);

  const handleAction = async (action: boolean, jobUrl: string) => {
    if (!action) {
      console.log("Attempting to delete report");

      // deleteReport(jobUrl).then((success) => {
      //   if (!success) {
      //     throw new Error("Error occurred while rejecting report");
      //   }
      //   location.reload();
      // });

      const timeout = new Promise(() =>
        setTimeout(() => {
          location.reload(); // Force refresh after 3 seconds
        }, 800)
      );

      Promise.race([deleteReport(jobUrl), timeout])
        .then((success) => {
          if (success) {
            console.log(`deleteReport successful`);
          }
        })
        .catch((error) => {
          console.log(`Error occurred handling report: ${error}`);
        });
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      const reports = await getReports();
      setReports(reports);
    };
    fetchReports();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <Navbar />
        <h1 className="text-6xl">ADMIN PAGE</h1>
        {reports === undefined && <p className=" text-xl">No active reports!</p>}
        {reports &&
          reports.map((report) => (
            <div className=" border-2 p-4 border-main-dblue rounded-lg" key={report.id}>
              <p>Report ID: {report.id}</p>
              <p>Job Url: {report.job_url}</p>
              <p>Report Type: {report.report_type}</p>
              <p>Report Reason: {report.report_reason}</p>
              <div className="flex justify-between">
                <button className="text-xl text-green-700">Accept</button>
                <button
                  onClick={() => handleAction(false, report.job_url)}
                  className="text-xl text-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
