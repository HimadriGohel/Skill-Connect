import React, { useEffect, useState } from "react";
import "../../src/Worker-Profile/Worker-profile.css";
import workerImg from "../assets/boyworker.jpeg";
import axios from "axios";

const ContentHeader = () => {

  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {

        const res = await axios.get(
          "http://localhost:8000/api/v1/workers/getWorkerprofile",
          { withCredentials: true }
        );

        setWorker(res.data.data.worker);

      } catch (error) {
        console.log("Error fetching profile", error);
      }
    };

    fetchWorkerProfile();
  }, []);

  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2 align-items-center">

         
          <div className="col-sm-6">
            <h1>
              Welcome, <span style={{ color: "#ff9502" }}>To your profile</span>
            </h1>
          </div>

         
          <div className="col-sm-6 text-end">
            <div
              className="d-flex align-items-center justify-content-end"
              style={{ gap: "10px" }}
            >

              
              <img
                src={worker?.file || workerImg}
                alt="profile"
                className="rounded-circle"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  border: "2px solid #2aa22a"
                }}
              />
 
                <span style={{ fontWeight: "600", fontSize: "16px" }}>
                {worker?.firstName} {worker?.lastName}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContentHeader;