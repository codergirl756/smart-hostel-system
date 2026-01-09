import React, { useState } from 'react';
import axios from 'axios';
const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNo: '',
    capacity: '',
    hasAC: false,
    hasAttachedWashroom: false,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('https://smart-hostel-system-1.onrender.com/api/rooms/', {
        ...formData,
        capacity: parseInt(formData.capacity, 10),
      });
      setMessage('✅ Room added successfully!');
      setFormData({ roomNo: '', capacity: '', hasAC: false, hasAttachedWashroom: false });
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Failed to add room'}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Room</h2>
      {message && <div className="mb-4 p-3 rounded text-sm">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Room Number *</label>
          <input
            type="text"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Capacity (Max Students) *</label>
          <input
            type="number"
            min="1"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            name="hasAC"
            checked={formData.hasAC}
            onChange={handleChange}
            className="mr-2 h-4 w-4"
          />
          <label className="text-gray-700">Has AC</label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="hasAttachedWashroom"
            checked={formData.hasAttachedWashroom}
            onChange={handleChange}
            className="mr-2 h-4 w-4"
          />
          <label className="text-gray-700">Has Attached Washroom</label>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
