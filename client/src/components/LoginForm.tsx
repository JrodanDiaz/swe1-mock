import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import DefaultProfilePic from "./DefaultProfilePic";
import { Link, useNavigate } from "react-router-dom";
import { getJWT, getReports, loginUser, registerUser, setJWT } from "../utilts";
import { useSetUser } from "./UserContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const updateUserContext = useSetUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log("HandleSubmit activated");

    e.preventDefault();
    loginUser({ username: username, password: password })
      .then((result) => {
        if (result.errorMessage) {
          setErrorMessage(result.errorMessage);
          return;
        }
        setJWT(result.token, username);
        updateUserContext({ username: username, isAdmin: username === "admin" });
        navigate("/admin");
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  const registerSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log("Attempting register");
    e.preventDefault();
    registerUser({ username: username, password: password })
      .then((result) => {
        if (result.errorMessage) {
          setErrorMessage(result.errorMessage);
          return;
        }
        console.log(`Succesfully registered user: ${result.token}`);
        setJWT(result.token, username);
        updateUserContext({ username: username, isAdmin: false });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit} className=" w-4/5 flex flex-col items-center justify-center">
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
  );

  const registerForm = () => (
    <form
      onSubmit={registerSubmit}
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
      <Button text="Register" submit={true} />
    </form>
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 border-4 rounded-xl p-6 border-main-blue w-1/3">
        {errorMessage && <p className="text-xl text-red-700">{errorMessage}</p>}
        <DefaultProfilePic height={200} width={200} />
        {registerMode ? registerForm() : loginForm()}
        <button
          onClick={() => setRegisterMode(!registerMode)}
          className="text-xl text-main-dblue"
        >
          {!registerMode
            ? "Don't have an account? Click to register."
            : "Have an account? Click to log in."}
        </button>
      </div>
    </>
  );
}
