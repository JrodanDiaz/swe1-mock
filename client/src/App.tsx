import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import { getJWT } from "./utilts";

function App() {
  const jwt = getJWT();
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <Navbar />
        {jwt === null && <LoginForm />}
        {jwt && <p className="text-3xl">Currently Logged In</p>}
        <Link to={"/report"}>To Report</Link>
        <Link to={"/admin"}>To Admin</Link>
      </div>
    </>
  );
}

export default App;
