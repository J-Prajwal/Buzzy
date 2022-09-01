import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import MainRoutes from "./Pages/MainRoutes";
import "./app.css"

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainRoutes />
      <Footer />
    </div>
  );
}

export default App;
