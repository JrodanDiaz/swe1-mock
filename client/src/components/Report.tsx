import { useEffect, useState } from "react";
import { getJWT, getUsername, submitReport, validateURL } from "../utilts";
import BlueBox from "./BlueBox";
import Navbar from "./Navbar";
import ReportForm from "./ReportForm";
import { Report } from "../types";
import { useNavigate } from "react-router-dom";
import { useSetUser, useUser } from "./UserContext";

export default function ReportPage() {
  const navigate = useNavigate();
  const username = getUsername();
  const userContext = useUser();
  const updateUserContext = useSetUser();
  const jwt = getJWT();
  const options = ["Ghost Job", "Scam Job", "Old/Deprecated Listing"];
  const question1 = "1. What kind of report are you filling?";
  const question2 = "2. Describe the reason for the report";
  const question3 = "3. Enter the job URL";
  const defaultReport: Report = {
    reporter: username,
    job_url: "",
    report_reason: "",
    report_type: "",
  };
  const [report, setReport] = useState<Report>(defaultReport);
  const [reportSuccess, setReportSuccess] = useState<boolean | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [clearSignal, setClearSignal] = useState(0);

  useEffect(() => {
    if (!jwt && !username) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log(`report changed: ${JSON.stringify(report)}`);
  }, [report]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userContext.reportCount >= 3) {
      setReportSuccess(false);
      setMessage("Error: Too many reports submitted at once");
      return;
    }
    const isValidURL = validateURL(report.job_url);
    if (!isValidURL) {
      setReportSuccess(false);
      setMessage("Please enter a valid url");
      return;
    }

    if (report.report_type === "other" || report.report_type === "") {
      setReportSuccess(false);
      setMessage("Please enter a valid report reason.");
      return;
    }
    console.log("Attempting to submit report");
    const success = await submitReport(report);
    if (success) {
      console.log("Successfully submitted report");
      setReport(defaultReport);
      setReportSuccess(true);
      setMessage("Report submitted. Thank you for your feedback.");
      updateUserContext({ ...userContext, reportCount: userContext.reportCount + 1 });
    } else {
      console.log("Error while submitting report");
      setReportSuccess(false);
      setMessage("Error while submitting report");
    }
    setClearSignal((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <Navbar />
        {reportSuccess === true && (
          <p className=" text-center text-green-600 text-xl">{message}</p>
        )}
        {reportSuccess === false && (
          <p className="text-center text-red-600 text-xl">{message}</p>
        )}
        <form onSubmit={handleSubmit} className=" w-4/6 flex flex-col gap-3">
          <BlueBox className="text-center py-8">
            <h1 className=" text-6xl text-main-dblue font-bold">Report Form</h1>
          </BlueBox>
          <ReportForm
            question={question1}
            options={options}
            useOther={true}
            setReport={setReport}
            field="report_type"
            clearSignal={clearSignal}
          />
          <ReportForm
            question={question2}
            setReport={setReport}
            field="report_reason"
            clearSignal={clearSignal}
          />
          <ReportForm
            question={question3}
            setReport={setReport}
            field="job_url"
            clearSignal={clearSignal}
          />
          <button
            className="border-2 border-black bg-main-lblue hover:bg-main-blue px-3 py-5 rounded-lg mb-8"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
