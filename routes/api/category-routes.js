const router = require("express").Router();
const { Category } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll()
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "There's no category with that id" });
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(
        err,
        "There was a problem with getting a category with selected ID"
      );
      res.json(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({});
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
