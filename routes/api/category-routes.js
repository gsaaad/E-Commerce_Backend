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
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err, "There was a problem with creating a category");
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res
          .status(404)
          .json({ message: "No category found with this ID... Try again" });
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err, "There was a problem with updating category by its ID");
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({
          message: "There's no category with this ID... Try Again...",
        });
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err, "There was a problem with deleting the category");
      res.status(500).json(err);
    });
});

module.exports = router;
