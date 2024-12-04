import { SetStateAction, useState } from "react";
import BlueBox from "./BlueBox";
import Input from "./Input";
import { Report } from "../types";

type field = "report_type" | "report_reason" | "job_url";

interface Props {
  question: string;
  options?: string[];
  useOther?: boolean;
  setReport: React.Dispatch<SetStateAction<Report>>;
  field: field;
}
export default function ReportForm({
  question,
  options,
  useOther = false,
  setReport,
  field,
}: Props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [response, setResponse] = useState("");

  const onReportReasonChange = (response: string) => {
    setResponse(response);
    setReport((prev) => ({ ...prev, [field]: response }));
  };

  const onOtherReasonChange = (reason: string) => {
    setSelectedOption(reason);
    setReport((prev) => ({ ...prev, [field]: reason }));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleOptionChange");

    setSelectedOption(e.target.value);
    setResponse("");
    setReport((prev) => ({ ...prev, [field]: e.target.value }));
    console.log("ran setReport");
  };

  if (!options) {
    return (
      <BlueBox className="flex flex-col gap-2">
        <p className="font-semibold">{question}</p>
        <Input
          onChange={onReportReasonChange}
          value={response}
          placeholder={"Enter response here"}
        />
      </BlueBox>
    );
  }
  return (
    <BlueBox className="flex flex-col gap-2">
      <p className="text-xl font-semibold">{question}</p>
      {options.map((option) => (
        <label>
          <input
            type="radio"
            value={option}
            checked={option === selectedOption}
            onChange={handleOptionChange}
          />
          {option}
        </label>
      ))}
      {useOther && (
        <>
          <label>
            <input
              type="radio"
              value={"other"}
              checked={"other" === selectedOption}
              onChange={handleOptionChange}
            />
            Other
          </label>
          <Input
            // onChange={setResponse}
            onChange={onOtherReasonChange}
            value={response}
            placeholder="Enter response here."
            disabled={selectedOption !== "other"}
            className={`${
              selectedOption === "other"
                ? ""
                : " disabled:bg-gray-200 disabled:cursor-not-allowed"
            }`}
          />
        </>
      )}
    </BlueBox>
  );
}
