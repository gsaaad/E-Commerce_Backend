const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ mode: Product }],
  })
    .then((tagData) => res.json(tagData))
    .catch((err) => {
      console.log(err, "There was a problem with getting all tags, Try again");
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((tagData) => {
      if (!tagData) {
        res
          .status(404)
          .json({ message: "There's no tag with this id, Try again.." });
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(
        err,
        "There was an error in finding a tag by its ID, Try agaain"
      );
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err, "There was an error in creating a new tag, try again");
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name,
  })
    .then((tagData) => {
      if (!tagData) {
        res
          .status(404)
          .json({ message: "Theres no tag with this id, try again!" });
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(
        err,
        "There was an error in updating a tag by its ID. Try again."
      );
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res
          .status(404)
          .json({ message: "Theres no tag with this id... try again!" });
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(
        err,
        "Theres an error with deleting a tag by its ID. Try again"
      );
      res.status(500).json(err);
    });
});

module.exports = router;
