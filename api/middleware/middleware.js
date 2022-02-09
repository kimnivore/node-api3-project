const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`${req.method}, ${req.url}, ${req.headers}`);
  next();
}

async function validateUserId(req, res, next) {
  let id = req.params.id;
  let result = await Users.getById(id);
  if(result == null) {
    res.status(404).json({ message: "user not found" });
  } else {
    req.user = result;
    next();
  }
}

function validateUser(req, res, next) {
  if(!req.body.name) {
    res.status(400).json({ message: "missing required name field"});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if(!req.body.text) {
    res.status(400).json({ message: "missing required text field"});
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}