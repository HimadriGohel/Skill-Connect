import React from 'react';
import menuicon from "../assets/menu-icon.png"
import searchicon from "../assets/search-icon.png"
import bellicon from "../assets/bell-icon.png"
import adminicon from "../assets/admin-icon.png"

import './adminHeader.css'

const adminHeader = () =>{

  return(

     <div className='main-header'>
    <div className='logosec'>
      <div className='skillconnect-logo'>SkillConnect</div>
       <img src={menuicon}
       className='icn menuicn'
       id='menuicn'
       alt='menu-icon'/>
    </div>

      <div className='searchbar'>
        <input type="text" placeholder='Search' id="text"/>
        <div className='searchbtn'>
        <img src={searchicon}
         className="icn srchicn"
        alt="search-icon"/>
  
          </div> 
      </div>

     <div className='message'>
      <div className='circle'></div>
      <img src={bellicon}
      className="icn"
      alt="bell" />
      
       <div className='dp'>
        <img src={adminicon}
        className="dpicn"
        alt="dp" />

       </div>
     </div>

</div>



  );

};

export default adminHeader;