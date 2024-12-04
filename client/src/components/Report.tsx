import { useEffect, useState } from "react";
import { submitReport } from "../utilts";
import BlueBox from "./BlueBox";
import Navbar from "./Navbar";
import ReportForm from "./ReportForm";
import { Report } from "../types";

export default function ReportPage() {
  const options = ["Ghost Job", "Scam Job", "Old/Deprecated Listing"];
  const question1 = "1. What kind of report are you filling?";
  const question2 = "2. Describe the reason for the report";
  const question3 = "3. Enter the job URL";
  const [report, setReport] = useState<Report>({
    job_url: "",
    report_type: "",
    report_reason: "",
  });

  useEffect(() => {
    console.log(`report changed: ${JSON.stringify(report)}`);
  }, [report]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Attempting to submit report");
    const success = await submitReport(report);
    console.log(`Success of submitReport: ${success}`);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <Navbar />
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
          />
          <ReportForm question={question2} setReport={setReport} field="report_reason" />
          <ReportForm question={question3} setReport={setReport} field="job_url" />
          <button className="border-2 border-main-dblue px-3 py-5 rounded-lg" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
