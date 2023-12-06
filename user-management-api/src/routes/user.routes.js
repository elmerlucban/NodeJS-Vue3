require('express-router-group');
const express = require('express');
const userController = require('../controllers/UserController')
const router = express.Router();

router.group("/api/v1/user", (router) => {
  router.post('/',               userController.create)
  router.get('/',                userController.findAll)
  router.get('/:userId',         userController.findOne)
  router.put('/:userId',         userController.update)
  router.delete('/:userId',      userController.delete)
})

module.exports = router