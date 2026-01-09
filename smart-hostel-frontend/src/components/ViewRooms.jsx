import React, { useEffect, useState } from 'react';
import API from '../services/api';
import axios from 'axios';
const ViewRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('https://smart-hostel-system.onrender.com/rooms');
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading rooms...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Rooms</h2>
      {rooms.length === 0 ? (
        <p className="text-gray-600">No rooms added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white p-4 rounded shadow border">
              <h3 className="font-bold text-lg text-blue-700">Room {room.roomNo}</h3>
              <p>👥 Capacity: {room.capacity}</p>
              <p>❄️ AC: {room.hasAC ? 'Yes' : 'No'}</p>
              <p>🚽 Washroom: {room.hasAttachedWashroom ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewRooms;
