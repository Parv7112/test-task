import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RawDetails() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedField, setSortedField] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(50);
  const navigate = useNavigate();

  const centerAlignStyle = { textAlign: "center" };

  useEffect(() => {
    fetch("https://engineering-task.elancoapps.com/api/raw")
      .then((response) => {
        if (!response.ok) {
          throw Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when done
      });
  }, []);

  if (loading) {
    // Display a loading spinner while fetching data
    return <Spinner animation="border" role="status" className="d-block mx-auto my-5" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSort = (field) => {
    if (field === sortedField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (field === sortedField) {
      return sortOrder === "asc" ? " ▲" : " ▼";
    }
    return null;
  };

  const sortedResult = result.slice().sort((a, b) => {
    if (sortedField) {
      const aValue = a[sortedField];
      const bValue = b[sortedField];
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const totalPages = Math.ceil(sortedResult.length / recordsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const currentRecords = sortedResult.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <div>
      <Button
        onClick={() => navigate("/")}
        variant="outline-secondary fw-bold"
        className="ml-auto my-2 mx-2"
      >
        Back
      </Button>
      <h2 className="text-center my-3">Raw Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={centerAlignStyle}>Serial Number</th>
            <th
              onClick={() => handleSort("ConsumedQuantity")}
              style={{ ...centerAlignStyle, cursor: "pointer" }}
            >
              Consumed Quantity {getSortIcon("ConsumedQuantity")}
            </th>
            <th
              onClick={() => handleSort("Cost")}
              style={{ ...centerAlignStyle, cursor: "pointer" }}
            >
              Cost {getSortIcon("Cost")}
            </th>
            <th
              onClick={() => handleSort("Date")}
              style={{ ...centerAlignStyle, cursor: "pointer" }}
            >
              Date {getSortIcon("Date")}
            </th>
            <th
              style={{ ...centerAlignStyle, cursor: "pointer" }}
              onClick={() => handleSort("InstanceId")}
            >
              Instance Id {getSortIcon("InstanceId")}
            </th>
            <th
              onClick={() => handleSort("MeterCategory")}
              style={centerAlignStyle}
            >
              MeterCategory
            </th>
            <th
              onClick={() => handleSort("ResourceGroup")}
              style={centerAlignStyle}
            >
              Resource Group
            </th>
            <th
              onClick={() => handleSort("ResourceLocation")}
              style={centerAlignStyle}
            >
              Resource Location
            </th>
            <th
              onClick={() => handleSort("UnitOfMeasure")}
              style={{ ...centerAlignStyle, cursor: "pointer" }}
            >
              Unit Of Measure {getSortIcon("UnitOfMeasure")}
            </th>
            <th onClick={() => handleSort("Location")} style={centerAlignStyle}>
              Location
            </th>
            <th
              onClick={() => handleSort("ServiceName")}
              style={centerAlignStyle}
            >
              Service Name
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record, index) => (
            <tr key={index}>
              <td style={centerAlignStyle}>{index + 1}</td>
              <td style={centerAlignStyle}>{record.ConsumedQuantity}</td>
              <td style={centerAlignStyle}>{record.Cost}</td>
              <td style={centerAlignStyle}>{record.Date}</td>
              <td style={centerAlignStyle}>{record.InstanceId}</td>
              <td style={centerAlignStyle}>{record.MeterCategory}</td>
              <td style={centerAlignStyle}>{record.ResourceGroup}</td>
              <td style={centerAlignStyle}>{record.ResourceLocation}</td>
              <td style={centerAlignStyle}>{record.UnitOfMeasure}</td>
              <td style={centerAlignStyle}>{record.Location}</td>
              <td style={centerAlignStyle}>{record.ServiceName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First onClick={() => paginate(1)} />
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => paginate(totalPages)} />
        </Pagination>
      </div>
    </div>
  );
}

export default RawDetails;
