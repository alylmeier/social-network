// Set requirements (Express Router)
const router = require('express').Router();

// Set routes (user and thought routes)
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Add `/users` to created routes 
router.use('/user', userRoutes);

// Add `/thoughts` to created routes 
router.use('/thought', thoughtRoutes);

// Export Module Router
module.exports = router;