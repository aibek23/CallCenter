const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const Profile = require("../models/Profile");
const path = require("path");
// const VacanciesPage = require('../models/VacanciesPage');
const fs = require("fs");
const multer = require("multer");
const { log } = require("console");
const News = require("../models/News");
const router = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/profile"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storageNews = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/news"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Обработчик ошибок для асинхронных функций
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// /api/upload/save
router.post("/save", auth, async (req, res) => {
  try {
    let upload = multer({ storage: storage }).single("image");
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: "Ошибка загрузки файла" });
      }

      if (!req.body.image[0]) {
        return res.status(400).json({ message: "пожалуйста заполните имя" });
      }

      if (!req.body.image[1]) {
        return res
          .status(400)
          .json({ message: "пожалуйста заполните описание" });
      }

      const newData = {
        image_src: req.file.filename,
        user_id: req.body.image[0],
        description: req.body.image[1],
      };
      if (req.body.image[0]) {
        try {
          // Используем метод findOne для поиска записи по user_id
          const existingProfile = await Profile.findOne({user_id: req.body.image[0]});

          if (!existingProfile) {
            await Profile.create(newData);
            res.json({ message: "Новая запись успешно создана" });
          }

          // Используем метод update для обновления данных
          await existingProfile.update(newData);

          return res.json({ message: "Данные успешно обновлены" });
        } catch (err) {
          return res
            .status(500)
            .json({
              message: "Ошибка при обновлении записи в базе данных",
              error: err,
            });
        }
      } else {
        await Profile.create(newData);
        res.json({ message: "Новая запись успешно создана" });
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

// /api/upload/delete
router.post(
  "/delete",
  auth,
  asyncHandler(async (req, res) => {
    const _id = req.body._id.toString();
    if (!_id || typeof _id !== "string") {
      return res.status(400).json({ message: "Invalid _id" });
    }
    const filteredData = await Profile.findOne( {user_id: _id });
    if (!filteredData) {
      return res.status(404).json({ message: "Data not found" });
    }
    fs.unlink(
      `${path.dirname(__dirname)}/views/reviews/${filteredData.image_src}`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    await Profile.deleteOne({  user_id: _id });
    res.json({ message: "Данные успешно удалены" });
  })
);

// /api/upload/show
router.post(
  "/show",
  asyncHandler(async (req, res) => {
    const allData = await Profile.find();
    res.json(allData);
  })
);

// /api/upload/showid

router.get("/showid/:id", auth, async (req, res) => {
  console.log(req.params.id);
  try {
    const userId = req.params.id;

    const process = await Profile.findOne({ user_id: userId });
 
    res.json(process);
  } catch (e) {
    res
      .status(500)
      .json({ message: `Что-то пошло не так, попробуйте снова   ${e}` });
  }
});

router.post("/news/save", auth, async (req, res) => {
  try {
    let upload = multer({ storage: storageNews }).single("image");
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: "Ошибка загрузки файла" });
      }

      if (!req.body.image[0]) {
        return res.status(400).json({ message: "пожалуйста заполните заголовок" });
      }

      if (!req.body.image[1]) {
        return res
          .status(400)
          .json({ message: "пожалуйста заполните описание" });
      }

      const newData = {
        user_id: req.body.image[0],
        image_src: req.file.filename,
        title:req.body.image[1],
        description: req.body.image[2],
        content:req.body.image[3],
      };
      if (req.body.image[0]) {
        try {
          await News.create(newData);
          return res.json({ message: "Новая запись успешно создана" });
        } catch (err) {
          return res
            .status(500)
            .json({
              message: "Ошибка при обновлении записи в базе данных",
              error: err,
            });
        }
      } else {
        await News.create(newData);
        res.json({ message: "Новая запись успешно создана" });
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

module.exports = router;
