import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Pagination, Form } from "react-bootstrap";

const ApplicationDetails = () => {
  const { application } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(50);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://engineering-task.elancoapps.com/api/applications/${application}`
    )
      .then((response) => response.json())
      .then((data) => {
        setApplicationData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching application details:", error);
        setLoading(false);
      });
  }, [application]);

  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (!applicationData) {
    return <div>No data available for this application.</div>;
  }

  const applicationArray = Object.entries(applicationData);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const filteredData = applicationArray.filter(([field, value]) => {
    return Object.values(value).some((item) =>
      item.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[1][sortField] > b[1][sortField] ? 1 : -1;
    } else {
      return a[1][sortField] < b[1][sortField] ? 1 : -1;
    }
  });
  
  const currentRecords = sortedData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
    
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection((prevSortDirection) =>
        prevSortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (field === sortField) {
      return sortDirection === "asc" ? "↑" : "↓";
    }
    return null;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const centerAlignStyle = {
    textAlign: "center",
  };

  const renderPageNumbers = pageNumbers.map((pageNumber) => (
    <Pagination.Item
      key={pageNumber}
      active={pageNumber === currentPage}
      onClick={() => paginate(pageNumber)}
    >
      {pageNumber}
    </Pagination.Item>
  ));

  return (
    <div>
      <h2 className="text-center my-3">{application} Details</h2>
      <div style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-3 w-50"
        />
      </div>
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
          {currentRecords.map(([field, value], index) => (
            <tr key={index}>
              <td style={centerAlignStyle}>{indexOfFirstRecord + index + 1}</td>
              <td style={centerAlignStyle}>{value.ConsumedQuantity}</td>
              <td style={centerAlignStyle}>{value.Cost}</td>
              <td style={centerAlignStyle}>{value.Date}</td>
              <td style={centerAlignStyle}>{value.InstanceId}</td>
              <td style={centerAlignStyle}>{value.MeterCategory}</td>
              <td style={centerAlignStyle}>{value.ResourceGroup}</td>
              <td style={centerAlignStyle}>{value.ResourceLocation}</td>
              <td style={centerAlignStyle}>{value.UnitOfMeasure}</td>
              <td style={centerAlignStyle}>{value.Location}</td>
              <td style={centerAlignStyle}>{value.ServiceName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {renderPageNumbers}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default ApplicationDetails;
