import Sidebar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import "./styles/App.css";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Members from "./components/Members";
import SubUnit from "./components/SubUnit";
import Profiles from "./components/Profiles";


const App:React.FC = () => {
  return (
    <Router>
    <div className="app">
      <Sidebar />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/attendance" component={Attendance} />
        <Route path="/users" component={Members} />
        <Route path="/subunits" component={SubUnit} />
        <Route path="/profiles" component={Profiles} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
