const express = require("express");
const router = express.Router();

const Recipe = require("../models/recipes");

// get all recipes
router.get("/", (request, response) => {
  Recipe.find().then((data) => {
    response.send(data);
  });
});

// get all recipes from user
router.get("/:userid", (request, response) => {
  Recipe.find({ created_by: request.params.userid }).then((data) => {
    response.send(data);
  });
});

//get specific recipe
router.get("/show-recipe/:id", (request, response) => {
  Recipe.findOne({ _id: request.params.id }).then((data) => {
    response.send(data);
  });
});

// add new recipes
router.post("/", async (request, response) => {
  try {
    const date = new Date().toLocaleString();

    const newRecipe = new Recipe(request.body);
    newRecipe.created_at = date;

    await newRecipe.save().then((recipe) => {
      if (recipe._id) {
        response.status(201).send({recipe: recipe, message: "Recipe Successfully Created"});
      } else {
        response.status(400).send({error: "Request failed"});
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

// edit new recipe
router.put("/edit-recipe/:id", (request, response) => {
  let error = new Error('RecipeUpdateException');
  error.message = 'Error in updating recipe';

  try {
    const date = new Date().toLocaleString();
    request.body.updated_at = date;

    Recipe.updateOne({ _id: request.params.id }, [{ $set: request.body}]).then((data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        response.status(201).send({message: "Recipe Updated"});
      } else {
        throw error;
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

// delete specific recipe
router.delete("/:id", (request, response) => {
  try {
    Recipe.deleteOne({ _id: request.params.id }).then((data) => {
      if (data.deletedCount > 0) {
        response.status(202).send({message: "Recipe Deleted"});
      } else {
        throw error;
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});


module.exports = router;