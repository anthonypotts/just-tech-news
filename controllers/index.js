const router = require('express').Router();
const apiRoutes = require('./api');
// to implement the view routes to the user with MVC
const homeRoutes = require('./home-routes.js');

// routes to enable viewing of homepage
router.use('/', homeRoutes);

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;