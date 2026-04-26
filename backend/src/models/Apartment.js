import mongoose from 'mongoose';

const apartmentSchema = new mongoose.Schema(
  {
    name:             { type: String, required: true, trim: true },
    blocks:           { type: Number, default: 0 },
    clubs:            { type: Number, default: 0 },
    gym:              { type: Boolean, default: false },
    pool:             { type: Boolean, default: false },
    park:             { type: Boolean, default: false },
    underConstruction:{ type: Boolean, default: false },
    color:            { type: String, default: 'stat-blue' },
  },
  { timestamps: true }
);

export default mongoose.model('Apartment', apartmentSchema);
