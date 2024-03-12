import React from "react";
import "../styles/Dashboard.css";
import Header from "./Header";
import { BsPeople, BsCollection, BsXCircle, BsCalendar } from "react-icons/bs";

const fakeDashboardData = [
  {
    id: 1,
    icon: BsPeople,
    numb: "35",
    text: "TOTAL MEMBERS",
  },
  {
    id: 2,
    icon: BsCollection,
    numb: "08",
    text: "TOTAL SUB-UNITS",
  },
  {
    id: 3,
    icon: BsXCircle,
    numb: "05",
    text: "ABSENT LAST WEEK",
  },
  {
    id: 4,
    icon: BsCalendar,
    numb: "02",
    text: "UPCOMING BIRTHDAYS",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="container">
      <Header pageTitle="Dashboard" />
      <div className="row">
        {fakeDashboardData.map((data) => (
          <div className="col-md-3 mb-4" key={data.id}>
            <div className="card h-100 border-dark">
              <div className="card-body d-flex align-items-center">
                <div className="dashboard-card-icon mr-2">
                  <data.icon />
                </div>
                <div className="dashboard-card-text flex-grow-1"> 
                  <p className="m-0 font-weight-bold">{data.numb}</p>
                  <p className="m-0">{data.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
