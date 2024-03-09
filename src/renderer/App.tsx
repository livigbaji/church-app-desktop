import Sidebar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import "./styles/App.css";


const App:React.FC = () => {
  return (
    <div className="app">
     <Sidebar />
     <Dashboard />
    </div>
  );
}

export default App;
