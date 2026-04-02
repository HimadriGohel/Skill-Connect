import react from "react";

import dashboardicon from "../assets/dashboard-icon.png"
import usericon from "../assets/user-icon.png"
import workericon from "../assets/worker-icon.png"
import complainticon from "../assets/complaint-icon.png"
import paymenticon from "../assets/payment-icon.png"
import settingicon from "../assets/setting-icon.png"
import logouticon from "../assets/logout-icon.png"
import './adminNavbar.css'

const adminNavbar = () =>{

  return(
      <div className="navcontainer">
         <nav className="nav-bar">
          <div className="nav-upper-options">
            <div className="nav-option option1">
              <img src={ dashboardicon} className="nav-img" alt="dashboard-icon"/>
              <h5>Dashboard</h5>
            </div>


             <div className="nav-option option2">
               <img src={usericon} className="nav-img" alt="user-icon"/>
              <h5>Users</h5>
             </div>
     
              <div className="nav-option option3">
                <img src = {workericon} className="nav-img" alt="worker-icon"/>
                <h5>Workers</h5>
              </div>

               <div className="nav-option option4">
                <img src= {complainticon} className="nav-img" alt="complaint-icon"/>
                  <h5>Complaints</h5>
                  </div>

                 <div className="nav-option option5">
                  <img src={paymenticon} className="nav-img" alt="payment-icon"/>
                  <h5>Payments</h5>
                  </div>
                
                  <div className="nav-option option6">
                  <img src={settingicon} className="nav-img" alt="setting-icon"/>
                  <h5>Settings</h5>
                    </div>

                    <div className="nav-option logout">
                    <img src={logouticon} className="nav-img" alt="logout-icon"/>
                    <h5>Logout</h5>
                    </div>

          </div>
        </nav>
      </div>
  );
};

export default adminNavbar;