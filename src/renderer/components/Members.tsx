import React from "react";
import Header from "./Header";
import { BsFileEarmarkArrowUp, BsPersonPlus } from "react-icons/bs";

const Members: React.FC = () => {
    return (
        <div className="container">
            <Header pageTitle="Members" />
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="filter" className="mr-2">Filter by:</label>
                        <select id="filter" className="form-select" style={{ width: "150px" }}>
                            <option value="name">Name</option>
                            <option value="number">Phone Number</option>
                            <option value="subunits">Sub Unit</option>
                        </select>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="float-right">
                        <label htmlFor="file-upload" className="btn btn-secondary m-2">
                            <BsFileEarmarkArrowUp /> Upload CSV
                            <input 
                                id="file-upload" 
                                type="file" 
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                                className="d-none" 
                            />
                        </label>
                        <button className="btn btn-primary"><BsPersonPlus /> Add User</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;
