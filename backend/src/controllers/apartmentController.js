import Apartment from '../models/Apartment.js';

// ─── GET /api/apartments ──────────────────────────────────────────────────────
export const getApartments = async (req, res) => {
  try {
    const apts = await Apartment.find().sort({ createdAt: -1 });
    return res.json(apts);
  } catch (err) {
    console.error('[getApartments]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── POST /api/apartments  (Admin) ───────────────────────────────────────────
export const createApartment = async (req, res) => {
  try {
    const apt = await Apartment.create(req.body);
    return res.status(201).json(apt);
  } catch (err) {
    console.error('[createApartment]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── PUT /api/apartments/:id  (Admin) ────────────────────────────────────────
export const updateApartment = async (req, res) => {
  try {
    const apt = await Apartment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!apt) return res.status(404).json({ message: 'Apartment not found' });
    return res.json(apt);
  } catch (err) {
    console.error('[updateApartment]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── DELETE /api/apartments/:id  (Admin) ─────────────────────────────────────
export const deleteApartment = async (req, res) => {
  try {
    const apt = await Apartment.findByIdAndDelete(req.params.id);
    if (!apt) return res.status(404).json({ message: 'Apartment not found' });
    return res.json({ message: 'Apartment deleted' });
  } catch (err) {
    console.error('[deleteApartment]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
