const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');


// The middleware functions also need to be required
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();


router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving all users",
      })
    })
});

  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding user"
      })
    })  
});

// RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating user"
      })
    })
});

 // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      res.status(200).json(req.user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error deleting user"
      })
    })
});

// RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error getting posts for the user"
    })
  })
});

 // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding post to the user"
      })
    })
});

// do not forget to export the router
module.exports = router;