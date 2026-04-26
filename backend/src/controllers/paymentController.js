import Payment from '../models/Payment.js';

// ─── GET /api/payments  (Admin gets all; Resident gets own) ──────────────────
export const getPayments = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'Resident') filter.userId = req.user.id;

    const payments = await Payment.find(filter)
      .populate('userId', 'firstName lastName unit')
      .sort({ date: -1 });

    return res.json(payments);
  } catch (err) {
    console.error('[getPayments]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── POST /api/payments  (Admin) ─────────────────────────────────────────────
export const createPayment = async (req, res) => {
  try {
    const { userId, category, amount, reason, date, status, method } = req.body;
    if (!userId || !category || !amount) {
      return res.status(400).json({ message: 'userId, category and amount are required' });
    }

    const payment = await Payment.create({ userId, category, amount, reason, date, status, method });
    return res.status(201).json(payment);
  } catch (err) {
    console.error('[createPayment]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── PUT /api/payments/:id  (Admin) ──────────────────────────────────────────
export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    return res.json(payment);
  } catch (err) {
    console.error('[updatePayment]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── DELETE /api/payments/:id  (Admin) ───────────────────────────────────────
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    return res.json({ message: 'Payment deleted' });
  } catch (err) {
    console.error('[deletePayment]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
