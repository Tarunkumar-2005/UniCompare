const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// @route GET /api/user/saved
// @desc Get user's saved colleges
router.get('/saved', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedColleges');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.savedColleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route POST /api/user/save/:collegeId
// @desc Save or unsave a college
router.post('/save/:collegeId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const collegeId = req.params.collegeId;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.savedColleges.indexOf(collegeId);
    let message = '';

    if (index === -1) {
      // Not saved, so save it
      user.savedColleges.push(collegeId);
      message = 'College saved successfully';
    } else {
      // Already saved, unsave it
      user.savedColleges.splice(index, 1);
      message = 'College removed from saved';
    }

    await user.save();
    res.json({ message, savedColleges: user.savedColleges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
