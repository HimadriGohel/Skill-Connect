import React from "react";
import '../../src/Worker-Profile/Worker-profile.css';

const Activity = () => {
  return (
    <div className="tab-pane" id="activity">

      {/* Post 1 - Jonathan Burke Jr. (same as before) */}
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
            <a href="#" className="link-black text-sm"><i className="far fa-comments mr-1 colour"></i> Comments (5)</a>
          </span>
        </p>
        <input className="form-control form-control-sm" type="text" placeholder="Type a comment..." />
      </div>


      <div className="post clearfix">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src="./dist/img/user7-128x128.jpg" alt="User" />
          <span className="username">
            <a href="#">Sarah Ross</a>
            <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
          </span>
          <span className="description">Sent you a message - 3 days ago</span>
        </div>
        <div className="border-left border-primary pl-3 my-3">
          <p>"Looking forward to our security audit next week. Let's make sure everything is compliant."</p>
        </div>
        <form className="form-horizontal">
          <div className="input-group input-group-sm mb-0">
            <input className="form-control form-control-sm" placeholder="Your response..." />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </div>
        </form>
      </div>

      <div className="post">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src="./dist/img/user6-128x128.jpg" alt="User" />
          <span className="username">
            <a href="#">Adam Jones</a>
            <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
          </span>
          <span className="description">Posted 5 photos - 5 days ago</span>
        </div>

     
        <div className="row mb-3">
          <div className="col-sm-7">
            <img 
              className="img-fluid rounded" 
              src="https://picsum.photos/id/1015/700/520" 
              alt="City skyline"
              style={{ height: "520px", objectFit: "cover", width: "100%" }}
            />
          </div>
        
          <div className="col-sm-5">
       
            <img 
              className="img-fluid rounded mb-3" 
              src="https://picsum.photos/id/160/350/250" 
              alt="Office"
              style={{ height: "250px", objectFit: "cover", width: "100%" }}
            />
       
            <img 
              className="img-fluid rounded" 
              src="https://picsum.photos/id/29/350/250" 
              alt="Meeting"
              style={{ height: "250px", objectFit: "cover", width: "100%" }}
            />
          </div>
        </div>

      
        <div className="row">
          <div className="col-sm-6">
            <img 
              className="img-fluid rounded" 
              src="https://picsum.photos/id/1018/500/280" 
              alt="Beach"
              style={{ height: "280px", objectFit: "cover", width: "100%" }}
            />
          </div>

       
          <div className="col-sm-6 position-relative">
            <img 
              className="img-fluid rounded" 
              src="https://picsum.photos/id/251/500/280" 
              alt="Dark room"
              style={{ height: "280px", objectFit: "cover", width: "100%" }}
            />
            <div 
              className="position-absolute bottom-0 end-0 bg-dark text-white px-4 py-2 rounded m-3 fw-bold"
              style={{ fontSize: "15px" }}
            >
              +2 More
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Activity;