import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName:  { type: String, required: true, trim: true },
    lastName:   { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:   { type: String, required: true },         
    role:       { type: String, enum: ['Admin', 'Resident', 'Staff'], default: 'Resident' },
    unit:       { type: String, default: '' },
    aptType:    { type: String, default: '' },
    area:       { type: String, default: '' },
    rent:       { type: Number, default: 0 },
    phone:      { type: String, default: '' },
    avatar:     { type: String, default: '' },             
  },
  { timestamps: true }
);

// Strip password from any JSON serialisation
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);
