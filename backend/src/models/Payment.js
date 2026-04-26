import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    amount:   { type: Number, required: true },
    reason:   { type: String, default: '' },
    date:     { type: Date,   default: Date.now },
    status:   { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Paid' },
    method:   { type: String, default: '' },    // UPI / Cash / Bank Transfer
    receipt:  { type: String, default: '' },    // receipt number or URL
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
