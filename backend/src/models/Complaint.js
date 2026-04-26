import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    complaint: { type: String, required: true },
    type:      { type: String, default: 'General' },
    status:    { type: String, enum: ['Pending', 'WIP', 'Done'], default: 'Pending' },
    days:      { type: Number, default: 0 },
    bill:      { type: Number, default: 0 },
    hasBill:   { type: Boolean, default: false },
    assignedTo:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    notes:     { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Complaint', complaintSchema);
