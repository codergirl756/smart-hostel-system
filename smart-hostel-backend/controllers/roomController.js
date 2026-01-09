const Room = require('../models/Room');

// @desc    Add a new room
// @route   POST /api/rooms
const addRoom = async (req, res) => {
  try {
    const { roomNo, capacity, hasAC, hasAttachedWashroom } = req.body;

    if (!roomNo || !capacity || typeof hasAC !== 'boolean' || typeof hasAttachedWashroom !== 'boolean') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const existing = await Room.findOne({ roomNo });
    if (existing) {
      return res.status(400).json({ message: 'Room number already exists' });
    }

    const room = new Room({ roomNo, capacity, hasAC, hasAttachedWashroom });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all rooms  
// @route   GET /api/rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNo: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search & filter rooms
// @route   GET /api/rooms/search
const searchRooms = async (req, res) => {
  try {
    const { minCapacity, needsAC, needsWashroom } = req.query;

    let query = {};

    if (minCapacity) query.capacity = { $gte: parseInt(minCapacity) };
    if (needsAC !== undefined) query.hasAC = needsAC === 'true';
    if (needsWashroom !== undefined) query.hasAttachedWashroom = needsWashroom === 'true';

    const rooms = await Room.find(query).sort({ capacity: 1, roomNo: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Allocate smallest suitable room for N students
// @route   POST /api/rooms/allocate
const allocateRoom = async (req, res) => {
  try {
    const { students, needsAC, needsWashroom } = req.body;

    if (!Number.isInteger(students) || students < 1) {
      return res.status(400).json({ message: 'Invalid number of students' });
    }

    const rooms = await Room.find({
      capacity: { $gte: students },
      hasAC: needsAC,
      hasAttachedWashroom: needsWashroom
    }).sort({ capacity: 1, roomNo: 1 });

    if (rooms.length === 0) {
      return res.status(404).json({ message: 'No room available' });
    }

    // Return the smallest room that fits
    res.json(rooms[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addRoom, getAllRooms, searchRooms, allocateRoom };