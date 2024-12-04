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
        <div>{JSON.stringify(user)}</div>
        {jwt === null && <LoginForm />}
        {jwt && <p className="text-3xl">Currently Logged In</p>}
        <Link to={"/report"}>To Report</Link>
        {user.isAdmin && <Link to={"/admin"}>To Admin</Link>}
      </div>
    </>
  );
}

export default App;
