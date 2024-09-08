const categoryController = require('../controllers/category.controller');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authJwt');
const { ROLE } = require('../constants');

router
  .route('/admin/categories')
  .post(
    auth.isAuthenticatedUser,
    auth.authorizeRoles(ROLE.ADMIN),
    categoryController.create
  );

router.route('/categories').get(categoryController.findAll);
router.route('/categories/:id').get(categoryController.findOne);

router
  .route('/admin/categories/:id')
  .put(
    [auth.isAuthenticatedUser, auth.authorizeRoles(ROLE.ADMIN)],
    categoryController.updateById
  )
  .delete(
    auth.isAuthenticatedUser,
    auth.authorizeRoles(ROLE.ADMIN),
    categoryController.deleteById
  );

module.exports = router;
