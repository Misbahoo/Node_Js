import { BrowserRouter } from "react-router-dom";
import Pages from "./routes/routes";
function App() {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
}

export default App;
