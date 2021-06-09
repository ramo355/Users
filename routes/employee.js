const { Router } = require("express");
const User = require("../model/User");
const router = Router();

router.post("/api/employee", async (req, res) => {
  try {
    const { name, lastName, post, number } = req.body;
    const candidate = await User.findOne({ number });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Такой сотрудник уже есть в базе данных" });
    } else {
      const user = new User({
        name,
        lastName,
        position: post,
        number,
      });
      await user.save();
      return res.status(200).json({ message: "Сотрудник добавлен" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/api/employee", async (req, res) => {
  await User.find({}, function (err, data) {
    res.json(data);
  });
});

router.delete("/api/employee/:id", async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id });
});

module.exports = router;
