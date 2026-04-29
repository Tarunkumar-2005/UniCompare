const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  fees: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  courses: [{ type: String }],
  placementPercentage: { type: Number, required: true, min: 0, max: 100 },
  avgPackage: { type: Number, required: true }, // in LPA (Lakhs Per Annum)
  image: { type: String, default: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop' }
}, { timestamps: true });

// Optional: Virtual property for Decision Score if we wanted to calculate it on DB level
// We'll calculate it in the frontend or API response dynamically to keep it flexible.

module.exports = mongoose.model('College', collegeSchema);
