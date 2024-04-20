
const Router = require('express');
const Time = require('../models/Time');
const User = require('../models/User');
const Comments = require ('../models/Comments');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/rating/save
router.post('/save', auth, 
async (req, res) => {
    try {
        const { rating, feedback, userEmail } = req.body;
        const existing = await Time.findOne({ "callFrom": userEmail }).sort({ _id: -1 }).limit(1);
        const сomments = new Comments({
          Rating: rating,
          Comments: feedback,
          Time_id: existing._id
        });
        await сomments.save();
        res.status(201).json({ сomments });
      } catch (e) {
        res.status(500).json({ message: `Что-то пошло не так, попробуйте снова${e}` });
      }
})

router.get('/latest',auth, 
async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id:userId}).sort({ _id: -1 }).limit(1);
    const time = await Time.findOne({ "callFrom": user.email }).sort({ _id: -1 }).limit(1);
    const existing = await Comments.findOne({ Time_id:time._id })
    if (existing) {
      return res.json(true)
    }
      res.json(false);// all time
  } catch (e) {
    res.status(500).json({ message:`Что-то пошло не так, попробуйте снова   ${e}` })
  }
})


module.exports = router