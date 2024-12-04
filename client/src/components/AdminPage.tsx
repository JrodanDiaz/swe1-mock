import { useEffect, useState } from "react";
import { banUser, deleteReport, getReports, getUsername } from "../utilts";
import { DB_REPORTS_ROW } from "../types";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const username = getUsername();
  const navigate = useNavigate();
  const [reports, setReports] = useState<DB_REPORTS_ROW[] | undefined>(undefined);
  const [displayBan, setDisplayBan] = useState<number>(-1);

  const handleAction = async (action: boolean, jobUrl: string) => {
    if (!action) {
      console.log("Attempting to delete report");

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

  const handleBanUser = (user: string) => {
    banUser(user)
      .then((success) => {
        if (success) {
          console.log("successfully banned user");
          if (reports && reports.length > 0) {
            setReports(reports.filter((report) => report.reporter !== user));
          }
        } else {
          console.log("failed to ban user");
        }
      })
      .catch((err) => {
        console.log(`Error while banning user: ${err}`);
      });
  };

  useEffect(() => {
    if (username !== "admin") {
      navigate("/");
    }
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
          reports.map((report, index) => (
            <div className=" border-2 p-4 border-main-dblue rounded-lg w-1/3" key={report.id}>
              <p>
                <span className="font-bold">Report ID:</span> {report.id}
              </p>
              <p>
                <span className="font-semibold">Job Url:</span> {report.job_url}
              </p>
              <p>
                <span className="font-semibold">Report Type:</span> {report.report_type}
              </p>
              <p>
                <span className="font-semibold">Report Reason:</span> {report.report_reason}
              </p>
              <p>
                <span className="font-semibold">Submitted by: </span>
                <span
                  onClick={() => setDisplayBan(index)}
                  className=" font-semibold text-main-dblue cursor-pointer"
                >
                  {report.reporter}
                </span>
              </p>
              {displayBan === index ? (
                <div className=" flex justify-between">
                  <button
                    onClick={() => handleBanUser(report.reporter)}
                    className="text-xl text-orange-500"
                  >
                    Ban User {report.reporter}?
                  </button>
                  <button className="text-xl text-red-700" onClick={() => setDisplayBan(-1)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <button
                    onClick={() => handleAction(false, report.job_url)}
                    className="text-xl text-green-700"
                  >
                    Flag as Suspicious
                  </button>
                  <button
                    onClick={() => handleAction(false, report.job_url)}
                    className="text-xl text-red-700"
                  >
                    Ignore
                  </button>
                </div>
              )}
              {/* <div className="flex justify-between">
                <button
                  onClick={() => handleAction(false, report.job_url)}
                  className="text-xl text-green-700"
                >
                  Flag as Suspicious
                </button>
                <button
                  onClick={() => handleAction(false, report.job_url)}
                  className="text-xl text-red-700"
                >
                  Ignore
                </button>
              </div> */}
            </div>
          ))}
      </div>
    </>
  );
}
