import mongoose from "mongoose";

const ComplaintsSchema = new mongoose.Schema(
  {

    subject:{
      type: String,
      required : true
    },
    description:{
      type : String,
      required : true
    }

}
)

export const Complaints = mongoose.model("Complaints", ComplaintsSchema);