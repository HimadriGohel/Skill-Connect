import React from 'react';
import './adminContainer.css';
import totalusers from '../assets/totalusers-icon.png'
import activeworker from "../assets/activeworker-icon.png"
import totalworkers from '../assets/totalworkers-icon.png'
import complaint from '../assets/complaint.png'

const adminContainer = () =>{

  return(
     <>
    <div className='box-container'>
          <div className="box box1" id='user'>
            <img src={totalusers}  alt="total users"/>
          <div className="text1">
             <h4 className="topic1">Total Users</h4>
            <h4 className="topic-heading1">0</h4>
          </div>
          </div>

          <div className="box box3" id='worker'>
           <img src={totalworkers}  alt="total workers"/>
          <div className="text3">
            <h4 className="topic3">Total Workers</h4>
            <h4 className="topic-heading3">0</h4>
          </div>
        </div>

         <div className="box box4" id='complaint'>
            <img src={complaint} alt="complaint"/>
          <div className="text4">
            <h4 className="topic4">Total Complaints</h4>
            <h4 className="topic-heading4">0</h4>
          </div>
        </div>

        </div>
</>
  )
}

export default adminContainer;