import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <Navbar />
        <LoginForm />
      </div>
    </>
  );
}

export default App;
