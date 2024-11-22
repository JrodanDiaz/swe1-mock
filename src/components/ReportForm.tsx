import { useState } from "react";
import BlueBox from "./BlueBox";
import Input from "./Input";

interface Props {
  question: string;
  options?: string[];
  useOther?: boolean;
}
export default function ReportForm({ question, options, useOther = false }: Props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [response, setResponse] = useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  if (!options) {
    return (
      <BlueBox className="flex flex-col gap-2">
        <p className="font-semibold">{question}</p>
        <Input onChange={setResponse} value={response} placeholder={"Enter response here"} />
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
            onChange={setResponse}
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
