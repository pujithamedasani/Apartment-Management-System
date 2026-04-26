import Complaint from '../models/Complaint.js';

// ─── GET /api/complaints  (Admin / Staff get all; Resident gets own) ──────────
export const getComplaints = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'Resident') filter.userId = req.user.id;

    const complaints = await Complaint.find(filter)
      .populate('userId', 'firstName lastName unit')
      .populate('assignedTo', 'firstName lastName')
      .sort({ createdAt: -1 });

    return res.json(complaints);
  } catch (err) {
    console.error('[getComplaints]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── POST /api/complaints  (Resident) ────────────────────────────────────────
export const createComplaint = async (req, res) => {
  try {
    const { complaint, type } = req.body;
    if (!complaint) return res.status(400).json({ message: 'Complaint text is required' });

    const doc = await Complaint.create({
      userId: req.user.id,
      complaint,
      type: type || 'General',
    });

    return res.status(201).json(doc);
  } catch (err) {
    console.error('[createComplaint]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── PUT /api/complaints/:id  (Admin / Staff) ────────────────────────────────
export const updateComplaint = async (req, res) => {
  try {
    const doc = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ message: 'Complaint not found' });
    return res.json(doc);
  } catch (err) {
    console.error('[updateComplaint]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── DELETE /api/complaints/:id  (Admin) ─────────────────────────────────────
export const deleteComplaint = async (req, res) => {
  try {
    const doc = await Complaint.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Complaint not found' });
    return res.json({ message: 'Complaint deleted' });
  } catch (err) {
    console.error('[deleteComplaint]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
