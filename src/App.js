import "./App.css";
import Login from "./Components/Auth/SignIn";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
