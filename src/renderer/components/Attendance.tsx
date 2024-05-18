import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/Attendance.css';

// Define FetchedData type
interface FetchedData {
  name: string;
  age: number;
  subUnit: string;
  servicesAttended: string[];
}

const Attendance: React.FC = () => {
  const [memberName, setMemberName] = useState('');
  const [subUnit, setSubUnit] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [fetchedData, setFetchedData] = useState<FetchedData | null>(null); // Use FetchedData type

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setServices([...services, value]);
    } else {
      setServices(services.filter(service => service !== value));
    }
  };

  const getData = async () => {
    try {
      // Assuming doStuff returns a record that needs transformation
      const stuff: Record<string, string> = await window.stuffAPI.database.doStuff('Livinus', 'somethingsecure');

      // Transforming the data to match FetchedData type
      const transformedData: FetchedData = {
        name: stuff.name,
        age: Number(stuff.age), // Assuming age is returned as a string
        subUnit: stuff.subUnit,
        servicesAttended: stuff.servicesAttended ? stuff.servicesAttended.split(',') : [], // Safely handle undefined or empty string
      };

      setFetchedData(transformedData); // Store transformed data in state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <Header pageTitle="Attendance" />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="memberName">Member Name:</label>
              <input
                type="text"
                className="form-control"
                id="memberName"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter member name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subUnit">Sub-unit:</label>
              <select
                className="form-control"
                id="subUnit"
                value={subUnit}
                onChange={(e) => setSubUnit(e.target.value)}
              >
                <option value="" disabled>
                  Please select a sub-unit
                </option>
                <option value="subUnit1">Sub-unit 1</option>
                <option value="subUnit2">Sub-unit 2</option>
                <option value="subUnit3">Sub-unit 3</option>
              </select>
            </div>
            <fieldset>
              <legend>Number of services</legend>
              <div className="form-group">
                {['1', '2', '3'].map((service) => (
                  <div key={service} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`service${service}`}
                      value={service}
                      checked={services.includes(service)}
                      onChange={handleServiceChange}
                    />
                    <label className="form-check-label" htmlFor={`service${service}`}>
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* Render fetched data */}
      {fetchedData && (
        <div className="fetched-data mt-4">
          <h3>Fetched Data:</h3>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Name: {fetchedData.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Age: {fetchedData.age}</h6>
              <p className="card-text">Sub-unit: {fetchedData.subUnit}</p>
              <p className="card-text">
                Services Attended: {fetchedData.servicesAttended.join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
