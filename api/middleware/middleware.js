function logger(req, res, next) {
  console.log('Hello from logger');
  next();
}

async function validateUserId(req, res, next) {
  let id = req.params.id;
  let result = await Users.getById(id);
  if(result == null) {
    res.status(404).json({ message: 'The user could not be found' });
  } else {
    req.hub = result;
    next();
  }
}

function validateUser(req, res, next) {
  if(!req.body.name) {
    res.status(404).json({ message: "We need a name"});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if(!req.body.user_id) {
    res.status(404).json({ message: 'We need a user ID' });
  } else if (!req.body.text) {
    res.status(404).json({ message: 'We need a text'});
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}