import { submitReport } from "../utilts";
import BlueBox from "./BlueBox";
import Navbar from "./Navbar";
import ReportForm from "./ReportForm";

export default function Report() {
  const options = ["Ghost Job", "Scam Job", "Old/Deprecated Listing"];
  const question1 = "1. What kind of report are you filling?";
  const question2 = "2. Describe the reason for the report";
  const question3 = "3. Enter the job URL";

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const success = await submitReport();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <Navbar />
        <form className=" w-4/6 flex flex-col gap-3">
          <BlueBox className="text-center py-8">
            <h1 className=" text-6xl text-main-dblue font-bold">Report Form</h1>
          </BlueBox>
          <ReportForm question={question1} options={options} useOther={true} />
          <ReportForm question={question2} />
          <ReportForm question={question3} />
          <button className="border-2 border-main-dblue" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
