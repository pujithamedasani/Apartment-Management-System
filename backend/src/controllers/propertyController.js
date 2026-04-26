import Property from '../models/Property.js';

// ─── GET /api/properties  (Admin gets all; Resident gets own) ────────────────
export const getProperties = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'Resident') filter.userId = req.user.id;

    const properties = await Property.find(filter)
      .populate('userId', 'firstName lastName email unit')
      .sort({ createdAt: -1 });

    return res.json(properties);
  } catch (err) {
    console.error('[getProperties]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── POST /api/properties  (Admin) ───────────────────────────────────────────
export const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    return res.status(201).json(property);
  } catch (err) {
    console.error('[createProperty]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── PUT /api/properties/:id  (Admin) ────────────────────────────────────────
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    return res.json(property);
  } catch (err) {
    console.error('[updateProperty]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── DELETE /api/properties/:id  (Admin) ─────────────────────────────────────
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    return res.json({ message: 'Property deleted' });
  } catch (err) {
    console.error('[deleteProperty]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
