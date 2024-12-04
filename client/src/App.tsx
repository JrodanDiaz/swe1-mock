import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <Navbar />
        <LoginForm />
        <Link to={"/report"}>To Report</Link>
        <Link to={"/admin"}>To Admin</Link>
      </div>
    </>
  );
}

export default App;
