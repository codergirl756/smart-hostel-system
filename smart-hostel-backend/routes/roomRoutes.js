const express = require('express');
const router = express.Router();
const {
  addRoom,
  getAllRooms,
  searchRooms,
  allocateRoom
} = require('../controllers/roomController');

router.post('/', addRoom);
router.get('/', getAllRooms);
router.get('/search', searchRooms);
router.post('/allocate', allocateRoom);

module.exports = router;