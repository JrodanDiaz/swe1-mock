import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import DefaultProfilePic from "./DefaultProfilePic";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 border-4 rounded-xl p-6 border-main-blue w-1/3">
        <DefaultProfilePic height={200} width={200} />
        <div className=" w-4/5">
          <label className="text-xl text-black font-bold">Username</label>
          <Input onChange={setUsername} value={username} placeholder="Enter Username" />

          <label className="text-xl text-black font-bold">Password</label>
          <Input
            onChange={setPassword}
            value={password}
            placeholder="Enter Password"
            type="password"
          />
        </div>
        <Button text="Sign In" />
      </div>
      <Link to={"/report"}>To Report</Link>
    </>
  );
}
