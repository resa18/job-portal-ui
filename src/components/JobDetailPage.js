import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/JobDetail.css";

const JobDetailPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [accessToken, setAccessToken] = useState(
    location.state?.accessToken || null
  );

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getDetailJobs?id=${id}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job detail:", error);
      }
    };

    fetchJobDetail();
  }, [accessToken]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-detail-container">
      <div className="back-button">
        <Link to="/jobs">
          <span>&#8592;</span> Back
        </Link>
      </div>
      <h1>{job.title}</h1>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Type:</strong> {job.type}
      </p>
      <p>
        <strong>Company:</strong> {job.company}
      </p>

      <div className="job-layout">
        <div className="job-description">
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>

        <div className="job-info">
          <div className="job-logo-container">
            <strong>{job.company}:</strong>
            <hr />
            <img
              src={job.company_logo}
              alt="Company Logo"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
          <div className="how-to-apply-container">
            <strong>How to Apply:</strong>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: job.how_to_apply }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
