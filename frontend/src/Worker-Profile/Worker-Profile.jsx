import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../Worker-Profile/worker-profile.CSS";
import ContentHeader from '../../components/WorkerProfileComponents/contentHeader';
import ProfileImage from '../../components/WorkerProfileComponents/profileImage';
import AboutMeBox from '../../components/WorkerProfileComponents/aboutMe';
import RightColumn from '../../components/WorkerProfileComponents/rightColumn';
import Activity from '../../components/WorkerProfileComponents/workerProfileActivity.jsx';
import Settings from '../../components/WorkerProfileComponents/workerProfileSettings.jsx';


const WorkerProfile = () => {
    const [activeTab, setActiveTab] = useState("activity");
    return (

        <div className="wrapper">
            {/* Content Wrapper */}
            <div className="content-wrapper">
                {/* Content Header */}
                <ContentHeader />
                {/* Main Content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* Left Column */}
                            <div className="col-md-3">
                                <ProfileImage />
                                <AboutMeBox />
                            </div>

                            {/* Right Column */}
                            <div className="col-md-9">
                                <div className="card">
                                    <RightColumn />
                                    {/* <div className="card-body">
                                        <div className="tab-content">
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
};

export default WorkerProfile;