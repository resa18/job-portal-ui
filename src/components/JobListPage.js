import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/JobList.css";
const JobList = ({ accessToken }) => {
  const [jobs, setJobs] = useState([]);
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("test:", accessToken);
    fetch("http://localhost:3000/api/getJobs", {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        return response.json();
      })
      .then((data) => setJobs(data))
      .catch((error) => {
        if (error.message === "Unauthorized") {
          // Handle unauthorized error (e.g., redirect to login)
          console.error("Unauthorized access");
        } else {
          console.error("Error fetching jobs:", error);
        }
      });
  }, [accessToken]);

  const handleSearch = () => {
    const url = "http://localhost:3000/api/getJobs?";
    const params = [];
    if (descriptionFilter) {
      params.push(`description=${descriptionFilter}`);
    }
    if (locationFilter) {
      params.push(`location=${locationFilter}`);
    }
    const queryParams = params.length > 0 ? `?${params.join("&")}` : "";

    fetch(`${url}${queryParams}`, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error searching jobs:", error));
  };

  const handleJobClick = (jobId) => {
    // Redirect to job detail page
    navigate(`/jobdetail/${jobId}`, { state: { accessToken } });
  };

  return (
    <div className="job-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Description"
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="job-list">
        <h1>Job List</h1>

        {jobs !== null
          ? jobs.map((job) => (
              <div key={job.id} className="job-preview">
                <h3
                  style={{ color: "blue" }}
                  onClick={() => handleJobClick(job.id)}
                >
                  {job.title}
                </h3>
                <p>
                  <span style={{ color: "grey" }}>{job.location}</span> -{" "}
                  <span style={{ color: "green" }}>{job.type}</span>
                </p>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default JobList;
