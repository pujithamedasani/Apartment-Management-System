// Storage keys
export const KEYS = {
  USERS: 'ams_users',
  COMPLAINTS: 'ams_complaints',
  PROPERTIES: 'ams_properties',
  PAYMENTS: 'ams_payments',
  APARTMENTS: 'ams_apartments',
};

// Helpers
export const getItem = (key) => JSON.parse(localStorage.getItem(key) || '[]');
export const setItem = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// Seed initial data if not present
export function seedData() {
  if (!localStorage.getItem(KEYS.USERS)) {
    setItem(KEYS.USERS, [
      { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@skypark.com', password: 'Admin@123', role: 'Admin', unit: '', aptType: '' },
      { id: 2, firstName: 'R', lastName: 'Resident', email: 'resident1@skypark.com', password: 'Resident@1', role: 'Resident', unit: 'A-101', aptType: '2BHK Apartment', area: '1200 sq.ft', rent: 15000 },
      { id: 3, firstName: 'Staff', lastName: 'Member', email: 'staff@skypark.com', password: 'Staff@123', role: 'Staff', unit: '', aptType: '' },
    ]);
  }
  if (!localStorage.getItem(KEYS.APARTMENTS)) {
    setItem(KEYS.APARTMENTS, [
      { id: 1, name: 'Sky-Park Apartments', blocks: 6, clubs: 2, parkGym: 1, pool: 1, underConstruction: false, color: 'stat-red' },
      { id: 2, name: 'Yamuna Apartments', blocks: 3, clubs: 1, parkPool: false, gym: true, underConstruction: false, color: 'stat-green' },
      { id: 3, name: 'Dolphine Apartments', blocks: 2, clubs: 0, gym: true, clubsPool: false, park: false, underConstruction: true, color: 'stat-orange' },
    ]);
  }
  if (!localStorage.getItem(KEYS.COMPLAINTS)) {
    setItem(KEYS.COMPLAINTS, [
      { id: 1, userId: 2, complaint: 'im facing an issue with taps in my flat please fix as fast as possible', status: 'Done', type: 'Plumbing', days: 2, bill: 5000, hasBill: false },
    ]);
  }
  if (!localStorage.getItem(KEYS.PAYMENTS)) {
  setItem(KEYS.PAYMENTS, [
    { id: 1, userId: 2, category: 'Resident Income', amount: 5638, reason: 'Monthly maintenance for shared costs', date: '2026-04-01' },
    { id: 2, userId: 3, category: 'Facility Booking', amount: 7000, reason: 'Clubhouse + deposit', date: '2026-04-05' },
    { id: 3, userId: 2, category: 'Move-In (MIMO)', amount: 1500, reason: 'Lift + security coordination', date: '2026-04-10' },
    { id: 4, userId: 3, category: 'Vendor Payment', amount: 250000, reason: 'Security agency contract', date: '2026-04-12' },
    { id: 5, userId: 2, category: 'Petty Cash', amount: 500, reason: 'Emergency plumbing items', date: '2026-04-15' },
    { id: 6, userId: 3, category: 'Utility Outflow', amount: 85000, reason: 'Electricity & water systems', date: '2026-04-18' },
    { id: 7, userId: 2, category: 'Legal/Admin', amount: 10000, reason: 'CA + GST filings', date: '2026-04-20' },
    { id: 8, userId: 3, category: 'Late Fee', amount: 250, reason: 'Penalty for delayed payments', date: '2026-04-22' },
  ]);
}
  if (!localStorage.getItem(KEYS.PROPERTIES)) {
    setItem(KEYS.PROPERTIES, [
      { id: 1, userId: 2, unit: 'A-101', type: '2BHK Apartment', area: '1200 sq.ft', rent: 15000, floor: 1, block: 'A' },
    ]);
  }
}

export function validatePassword(password) {
  // 6-8 letters + 1 special char + 1-5 numbers, min 8 chars total
  const letters = (password.match(/[a-zA-Z]/g) || []).length;
  const numbers = (password.match(/[0-9]/g) || []).length;
  const specials = (password.match(/[^a-zA-Z0-9]/g) || []).length;
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (letters < 6 || letters > 8) return 'Password must contain 6–8 letters';
  if (specials < 1) return 'Password must contain at least 1 special character';
  if (numbers < 1 || numbers > 5) return 'Password must contain 1–5 numbers';
  return null;
}
