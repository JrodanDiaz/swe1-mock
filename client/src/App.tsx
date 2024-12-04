import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import { getJWT } from "./utilts";
import { useUser } from "./components/UserContext";

function App() {
  const jwt = getJWT();
  const user = useUser();
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <Navbar />
        {jwt === null && <LoginForm />}
        {jwt && (
          <p className="text-3xl">
            Currently Logged In as <span className=" font-semibold">{user.username}</span>
          </p>
        )}
        {user.username && (
          <Link
            to={"/report"}
            className="border-2 border-black bg-main-lblue hover:bg-main-blue rounded-full w-40 text-center px-5 py-3"
          >
            Report a Job
          </Link>
        )}
        {user.isAdmin && (
          <Link
            to={"/admin"}
            className="border-2 border-black bg-main-lblue hover:bg-main-blue rounded-full w-40 text-center px-5 py-3"
          >
            To Admin
          </Link>
        )}
      </div>
    </>
  );
}

export default App;
