import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// ─── GET /api/users  (Admin) ──────────────────────────────────────────────────
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    console.error('[getUsers]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── GET /api/users/:id  (Admin or own user) ─────────────────────────────────
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error('[getUserById]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── PUT /api/users/:id  (Admin or own user) ─────────────────────────────────
export const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Allow password change only for own account
    const updateData = { ...rest };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error('[updateUser]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ─── DELETE /api/users/:id  (Admin) ──────────────────────────────────────────
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('[deleteUser]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
