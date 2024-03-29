import Header from "./Header";

const Attendance : React.FC = () => {
    return(
      <div className="container">
        <Header pageTitle="Attendance" />
        <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="memberName">Member Name:</label>
              <input type="text" className="form-control" id="memberName" placeholder="Enter member name" />
            </div>
            <div className="form-group">
              <label htmlFor="subUnit">Sub-unit:</label>
              <select className="form-control" id="subUnit">
                <option value="" disabled selected>Please select a sub-unit</option>
                <option value="subUnit1">Sub-unit 1</option>
                <option value="subUnit2">Sub-unit 2</option>
                <option value="subUnit3">Sub-unit 3</option>
              </select>
            </div>
            <div className="form-group">
              <label>Number of Services:</label><br />
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="service1" value="1" />
                <label className="form-check-label" htmlFor="service1">1</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="service2" value="2" />
                <label className="form-check-label" htmlFor="service2">2</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="service3" value="3" />
                <label className="form-check-label" htmlFor="service3">3</label>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    )
  }
  
  export default Attendance ;