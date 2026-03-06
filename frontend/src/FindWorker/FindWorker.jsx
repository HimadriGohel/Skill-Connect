import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllWorkers, fetchFilteredWorkers, setFilters, successForWorkers } from "../../store/slices/workerSlice.js";
import Accordion from "../../components/accordian/accordian";
// import WorkerProfileCard from "../../components/WorkerProfileCard/WorkerProfileCard";
import "./FindWorker.css";

const FindWorker = () => {
  const dispatch = useDispatch();
  const { workers, allWorkers, loading, error, filters } = useSelector((state) => state.workers);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    {
      dispatch(fetchAllWorkers());
    }
  }, [dispatch]);


  const handleSearch = () => {
    if (searchKeyword.trim() === "") {
      dispatch(successForWorkers(allWorkers)); 
      return;
    }

   
    const filteredWorkers = allWorkers.filter(worker =>
      worker.firstName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      worker.lastName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      worker.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      worker.city.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    dispatch(successForWorkers(filteredWorkers)); 
  };


  const handleApplyFilter = (selectedFilters) => {
    dispatch(setFilters({
      category: selectedFilters.category,
      city: selectedFilters.city,
      hourlyPay: selectedFilters.hourlyPay,
      searchKeyword: selectedFilters.searchKeyword  
    }));
    dispatch(fetchFilteredWorkers());

    console.log(workers);
  }

  return (
    <div>    
     <div className="banner-image">
        <img src="../../components/assets/jobboard-banner.jpg" alt="banner-image" />
      </div> 
      <div className="worker-banner-text">
        <h2 style={{ fontWeight: 600 , fontSize: "2rem" }}>Worker Portal</h2>
        <div className="small-bold-text" style={{ fontSize: "1.5rem" , color: "orange" }}>
        Find Perfect Workers For Your Needs
        </div>
      </div>
     
            
      <div className="filter-wrap">
        <div className="worker-filter d-flex">
          <div className="filter-left">
            <p className="filter-common">Search Filters</p>
            <Accordion handleApplyFilter={handleApplyFilter} />
          </div>

          <div className="filter-right">
            <div className="search-input mt-0 flex">
                <input type="text" 
                className="form-control" 
                aria-label="Sizing example input" 
                aria-describedby="inputGroup-sizing-sm"   
                value={searchKeyword}  
                onChange={(e) => setSearchKeyword(e.target.value)}  
                placeholder="What are you looking for?"/>
              <button className="btn btn-outline-warning" onClick={handleSearch}>
                Search
              </button>
            </div>
            
            <div className="card card-solid">
              <div className="card-body pb-0">
                <div className="row">
                  <div className="container">
                    <div className="row">
                      {loading ? (
                        <p className="text-center">Loading workers...</p>
                      ) : error ? (
                        <p className="text-center text-danger">Error: {error}</p>
                      ) : Array.isArray(workers) && workers.length > 0 ? (
                        workers.map((worker) => (
                          <div key={worker._id} className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                            <div className="card bg-light d-flex flex-fill">
                              <div className="card-header text-muted border-bottom-0 flex justify-content-between">
                                <div className="worker-card-category">
                                  {worker.category}
                                </div>
                                <div>
                                  <i className="fa-solid fa-indian-rupee-sign"></i>{worker.hourlyPay}/hr.
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="row gap flex">
                                  <div className="col-7">
                                    <h2 className="lead">
                                      <p>{worker.firstName ? `${worker.firstName} ${worker.lastName}` : "No Name"}</p>
                                    </h2>
                                    <p className="text-muted">
                                      <span>Experience:</span> {worker.workerDetails || "No details available"}
                                    </p>
                                    <ul className="mb-0 fa-ul">

                                      <li className="small">
                                        <span className="fa-li"><i className="fa-solid fa-location-dot fa-lg"></i> </span>{worker.city || "No cities"}
                                      </li>

                                      <li className="small">
                                        <span className="fa-li"><i className="fas fa-lg fa-phone"></i></span>
                                        {worker.phone || "No phone number"}
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-5 text-center">
                                    <img
                                      src={worker.file ? worker.file : "/default-user.png"}
                                      alt={`${worker.firstName} ${worker.lastName}`}
                                      className="rounded"
                                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                                <div className="text-right">
                                  <a href={`/worker-profile02/${worker._id}`} className="btn">
                                    <i className="fas fa-user"></i> View Profile
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center">No workers found.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindWorker;