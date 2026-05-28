// const mongoose = require("mongoose");

import {  Complaints }from "../models/Complaints.model.js";
import { ApiError } from "../utils/ApiError.js";

const addComplaint = async (req, res) => {
  const { subject, description } = req.body;
  console.log("BODY:", req.body);
  if (!subject) {
    return res.status(400).json({ message: "subject is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "description is required" });
  }
  const complaint = await Complaints.create({
    subject,
    description
  });
  return res.status(201).json({
    message: "Complaint created",
    data: complaint
  });
};

const getComplaint = async(req,res) =>{


  try{

    const complaint = await Complaints.find();

    return res.status(200).json({
      message : "complaint fetch successufully",
      data : complaint
    })
  }
  catch(error){
     return res.status(500).json({
      message : "fetching  error"
     })
  }
}


export{
  addComplaint,
  getComplaint
}