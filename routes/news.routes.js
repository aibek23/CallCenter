const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const News = require("../models/News");
const User = require("../models/User");
const router = Router();

// /api/news/all
router.get("/all", auth, async (req, res) => {
    try {
      const userall = await News.find().exec();
      res.json(userall);
    } catch (e) {
      res.status(500).json({ message: `Что-то пошло не так, попробуйте снова   ${e}` });
    }
  });

// /api/news/showid/:id
router.get("/showid/:id", auth, async (req, res) => {

  try {
    const newsId = req.params.id;

    const process = await News.find( { _id: newsId });
 
    res.json(process);
  } catch (e) {
    res
      .status(500)
      .json({ message: `Что-то пошло не так, попробуйте снова   ${e}` });
  }
});
// /api/user/delete/:id
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    // Corrected syntax for findOne
    const user = await User.findOne({ _id: userId  });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use the destroy method to delete the user
    await user.remove();

    res.json({ message: "User deleted successfully" });
  } catch (e) {
    console.error(e); // Log the error for debugging purposes

    res.status(500).json({ message: `Что-то пошло не так, попробуйте снова   ${e.message || e}` });
  }
});
// /api/user/update/:id
router.delete("/update/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    // Corrected syntax for findOne
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update the user's role to "editor"
    if (user.role === "user") {
      user.role = "editor";
      await user.save();
    }else{
      user.role = "user";
      await user.save();
    }

    res.json({ message: "User role updated successfully" });
  } catch (e) {
    console.error(e); // Log the error for debugging purposes

    res.status(500).json({ message: `Что-то пошло не так, попробуйте снова   ${e.message || e}` });
  }
});
module.exports = router;