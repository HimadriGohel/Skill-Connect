import { Router } from "express";

import  {  addComplaint , getComplaint } from  "../controllers/complaint.controller.js";


const complaintRouter = Router();

complaintRouter.route("/addComplaint").post(addComplaint);
complaintRouter.route("/getComplaint").get(getComplaint);

export{complaintRouter};