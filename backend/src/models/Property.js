import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    unit:    { type: String, required: true },
    type:    { type: String, default: '' },     // 2BHK, 3BHK …
    area:    { type: String, default: '' },     // "1200 sq.ft"
    rent:    { type: Number, default: 0 },
    floor:   { type: Number, default: 0 },
    block:   { type: String, default: '' },
    status:  { type: String, enum: ['Occupied', 'Vacant', 'Maintenance'], default: 'Occupied' },
  },
  { timestamps: true }
);

export default mongoose.model('Property', propertySchema);
