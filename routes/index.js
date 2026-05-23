const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('RecipeBox API');
});

router.use('/recipes', require('./recipes'));
router.use('/categories', require('./categories'));
router.use('/api-docs', require('./swagger'));

module.exports = router;