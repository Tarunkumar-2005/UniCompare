const express = require('express');
const router = express.Router();
const College = require('../models/College');

// @route GET /api/colleges
// @desc Get all colleges with search, filter, and pagination
router.get('/', async (req, res) => {
  try {
    const { search, location, minFees, maxFees, page = 1, limit = 10 } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minFees || maxFees) {
      query.fees = {};
      if (minFees) query.fees.$gte = Number(minFees);
      if (maxFees) query.fees.$lte = Number(maxFees);
    }

    const colleges = await College.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await College.countDocuments(query);

    res.json({
      colleges,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route GET /api/colleges/:id
// @desc Get a single college by ID
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: 'College not found' });
    res.json(college);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route POST /api/colleges/compare
// @desc Get multiple colleges for comparison
router.post('/compare', async (req, res) => {
  try {
    const { ids } = req.body; // Expect an array of college IDs
    if (!ids || !Array.isArray(ids) || ids.length < 2) {
      return res.status(400).json({ message: 'Please provide at least two college IDs' });
    }

    const colleges = await College.find({ _id: { $in: ids } });
    res.json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
