import React from "react";
import '../../src/Worker-Profile/Worker-profile.css';

const Activity = () => {
  return (
    <div className="tab-pane" id="activity">

      <div className="post">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src="./dist/img/user1-128x128.jpg" alt="User" />
          <span className="username">
            <a href="#">Jonathan Burke Jr.</a>
            <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
          </span>
          <span className="description">Shared publicly - 7:30 PM today</span>
        </div>
        <p>
          Our team is exploring new design systems for enterprise dashboards. Lorem ipsum represents a long-held tradition for designers, typographers, and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools.
        </p>
        <p>
          <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</a>
          <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1"></i> Like</a>
          <span className="float-right">
            <a href="#" className="link-black text-sm"><i className="far fa-comments mr-1 colour"></i> Comments (3)</a>
          </span>
        </p>
        <input className="form-control form-control-sm" type="text" placeholder="Type a comment..." />
      </div>

    
      <div className="post">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src="./dist/img/user7-128x128.jpg" alt="User" />
          <span className="username">
            <a href="#">Sarah Ross</a>
            <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
          </span>
          <span className="description">Sent you a message - 3 days ago</span>
        </div>
        <p>
          Looking forward to our security audit next week. Let's make sure everything is compliant.
        </p>
        <p>
          <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</a>
          <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1"></i> Like</a>
          <span className="float-right">
            <a href="#" className="link-black text-sm"><i className="far fa-comments mr-1 colour"></i> Comments (5)</a>
          </span>
        </p>
        <input className="form-control form-control-sm" type="text" placeholder="Your response..." />
      </div>

   
      <div className="post">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src="./dist/img/user8-128x128.jpg" alt="User" />
          <span className="username">
            <a href="#">Ethan Barrett</a>
            <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
          </span>
          <span className="description">Sent you a message - 10 days ago</span>
        </div>
        <p>
          The worker did an excellent job. He arrived on time and worked very professionally. The quality of the work was very good. I am very satisfied with the service.
        </p>
        <p>
          <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</a>
          <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1"></i> Like</a>
          <span className="float-right">
            <a href="#" className="link-black text-sm"><i className="far fa-comments mr-1 colour"></i> Comments (7)</a>
          </span>
        </p>
        <input className="form-control form-control-sm" type="text" placeholder="Your response..." />
      </div>

   
      <div className="post">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src="./dist/img/user4-128x128.jpg" alt="User" />
          <span className="username">
            <a href="#">Georgina Garner</a>
            <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
          </span>
          <span className="description">Sent you a message - 20 days ago</span>
        </div>
        <p>
          The worker was very polite and friendly. He completed the work quickly and carefully. Everything was done neatly and properly. I would definitely recommend this worker.
        </p>
        <p>
          <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</a>
          <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1"></i> Like</a>
          <span className="float-right">
            <a href="#" className="link-black text-sm"><i className="far fa-comments mr-1 colour"></i> Comments (8)</a>
          </span>
        </p>
        <input className="form-control form-control-sm" type="text" placeholder="Your response..." />
      </div>

    </div>
  );
};

export default Activity;