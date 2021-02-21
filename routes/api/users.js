const
  express = require('express'),
  users = require('../../Users'),
  router = express.Router()

router.get('/', (req, res) => {
  res.json(users)
})

module.exports = router