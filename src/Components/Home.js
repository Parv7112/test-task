import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [applications, setApplications] = useState([]);
  const [resources, setResources] = useState([]);
  const [appLoading, setAppLoading] = useState(true);
  const [resLoading, setResLoading] = useState(true);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://engineering-task.elancoapps.com/api/applications")
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        setAppLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setAppLoading(false);
      });

    fetch("https://engineering-task.elancoapps.com/api/resources")
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
        setResLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
        setResLoading(false);
      });
  }, []);

  const handleClick = (item) => {
    console.log(item);
    fetch(`https://engineering-task.elancoapps.com/api/applications/${item}`)
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error("Error fetching additional data:", error);
      });
  };

  return (
    <div>
      <div>
        <Link to="/raw-details">
          <Button
            variant="outline-secondary fw-bold"
            className="ml-auto my-2 mx-2"
          >
            Raw Details
          </Button>
        </Link>
      </div>
      <Tabs
        defaultActiveKey="Application"
        id="fill-tab-example"
        className="mb-3 fs-2"
        fill
      >
        <Tab eventKey="Application" title="Application">
          {appLoading ? (
            <div>Loading Applications...</div>
          ) : applications.length === 0 ? (
            <div>No application data available.</div>
          ) : (
            <div className="d-flex justify-content-center">
              <table className="table table-striped table-bordered w-75 text-center">
                <thead>
                  <tr>
                    <th className="fs-4">Serial No. </th>
                    <th className="fs-4">Field</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((item, index) => (
                    <tr key={index}>
                      <td className="fs-5">{index + 1}</td>
                      <td className="fs-5">
                        <Link
                          className="text-decoration-none text-black"
                          to={`/application/${item}`}
                        >
                          {item}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Tab>
        <Tab eventKey="Resources" title="Resources">
          {resLoading ? (
            <div>Loading Resources...</div>
          ) : resources.length === 0 ? (
            <div>No resource data available.</div>
          ) : (
            <div className="d-flex justify-content-center">
              <table className="table table-striped table-bordered w-75 text-center">
                <thead>
                  <tr>
                    <th className="fs-4">Serial No.</th>
                    <th className="fs-4">Field</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((item, index) => (
                    <tr key={index}>
                      <td className="fs-5">{index + 1}</td>
                      <td className="fs-5">
                        <Link
                          className="text-decoration-none text-black"
                          to={`/resources/${item}`}
                        >
                          {item}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Home;
