import React, { useState } from "react";
import axios from "axios"; 
import './Complaint.css';

const Complaint = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");

    const maxSize = 2 * 1024 * 1024; // 2 MB
    const allowedTypes = /(\.jpg|\.jpeg|\.png|\.pdf|\.doc|\.ppt|\.zip|\.mp3|\.mp4)$/i;

    if (file) {
      if (file.size > maxSize) {
        setError(`File ${file.name} exceeds 2 MB.`);
        return;
      }
      if (!allowedTypes.exec(file.name)) {
        setError(`File type of ${file.name} is not allowed.`);
        return;
      }
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) { 
        alert("Ticket submitted successfully!");
        setSubject("");
        setDescription("");
        setFile(null);
      } else {
        alert("Failed to submit the ticket.");
      }
    } catch (error) {  
      console.error("Error submitting the ticket:", error);
      alert("Error submitting the ticket.");
    }
  };

  return (
    <div className="support-ticket container">
      <div className="ticket-header">
        <h2 style={{ color: "#ff9502", textAlign: "center" }}>
          Have any complaint?
        </h2>
      </div>
      <div className="ticket-content">
        <form className="ticket-content-form" onSubmit={handleSubmit}>
          <div className="form-subject flex">
            <label htmlFor="subject" id="subject-label">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Purpose to write a ticket"
              required
            />
          </div>
          <div className="form-subject flex">
            <label htmlFor="description" id="description-label">Description</label>
            <textarea
              name="complaine-description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="10"
              placeholder="Explain in brief..."
              required
            ></textarea>
          </div>
          <div className="form-subject flex">
            <label htmlFor="attachments" id="attachments-label">Attachments</label>
            <input 
              type="file" 
              name="file" 
              id="attachments" 
              className="choose-file"
              accept="image/*,.doc,.docx,application/msword" 
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="upload-criteria">
              You can upload up to 2 files (maximum 2 MB each) of the following
              types: .jpg, .jpeg, .png, .pdf, .doc, .ppt, .zip, .mp3, .mp4
            </p>
            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
          </div>
          
          <div className="ticket-btn">
            <button type="submit" className="primary-btn">SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
