import Sidebar from "./components/SideBar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import "./styles/App.css";


const App:React.FC = () => {
  return (
    <>
      {/* Sidebar component */}
     <Sidebar />
     {/* Header component */}
     <Header />
     {/* Dashboard component */}
     <Dashboard />
    </>
  );
}

export default App;
