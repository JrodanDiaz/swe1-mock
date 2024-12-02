import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import DefaultProfilePic from "./DefaultProfilePic";
import { Link, useNavigate } from "react-router-dom";
import { getReports, loginUser } from "../utilts";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({ username: username, password: password })
      .then((user) => {
        console.log(`Succesfully logged in user: ${user}`);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 border-4 rounded-xl p-6 border-main-blue w-1/3">
        <DefaultProfilePic height={200} width={200} />
        <form
          onSubmit={handleSubmit}
          className=" w-4/5 flex flex-col items-center justify-center"
        >
          <div>
            <label className="text-xl text-black font-bold">Username</label>
            <Input onChange={setUsername} value={username} placeholder="Enter Username" />
          </div>

          <div>
            <label className="text-xl text-black font-bold">Password</label>
            <Input
              onChange={setPassword}
              value={password}
              placeholder="Enter Password"
              type="password"
            />
          </div>
          <Button text="Sign In" submit={true} />
        </form>
      </div>
      <Link to={"/report"}>To Report</Link>
      <Link to={"/admin"}>To Admin</Link>
      <button onClick={getReports}>GET REPORTS</button>
    </>
  );
}
