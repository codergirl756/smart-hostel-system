import React, { useState } from 'react';
import axios from 'axios';
const SearchAllocate = () => {
  // Search state
  const [searchParams, setSearchParams] = useState({
    minCapacity: '',
    needsAC: '',
    needsWashroom: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchMsg, setSearchMsg] = useState('');

  // Allocate state
  const [allocParams, setAllocParams] = useState({
    students: '',
    needsAC: false,
    needsWashroom: false,
  });
  const [allocatedRoom, setAllocatedRoom] = useState(null);
  const [allocMsg, setAllocMsg] = useState('');

  // Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchMsg('');
    setSearchResults([]);
    try {
      const params = {};
      if (searchParams.minCapacity) params.minCapacity = searchParams.minCapacity;
      if (searchParams.needsAC !== '') params.needsAC = searchParams.needsAC;
      if (searchParams.needsWashroom !== '') params.needsWashroom = searchParams.needsWashroom;

      const res = await axios.get('https://smart-hostel-system-1.onrender.com/api/rooms/search', { params });
      setSearchResults(res.data);
      if (res.data.length === 0) setSearchMsg('No rooms match your criteria.');
    } catch (err) {
      setSearchMsg('Error while searching rooms.');
    }
  };

  // Handle Allocation
  const handleAllocate = async (e) => {
    e.preventDefault();
    setAllocMsg('');
    setAllocatedRoom(null);
    try {
      const payload = {
        students: parseInt(allocParams.students, 10),
        needsAC: allocParams.needsAC,
        needsWashroom: allocParams.needsWashroom,
      };
      const res = await axios.post('https://smart-hostel-system-1.onrender.com/api/rooms/allocate', payload);
      setAllocatedRoom(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setAllocMsg('No room available');
      } else {
        setAllocMsg('Allocation failed');
      }
    }
  };

  return (
    <div className="space-y-10 mt-6">
      {/* Search Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🔍 Search Rooms</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Minimum Capacity</label>
            <input
              type="number"
              value={searchParams.minCapacity}
              onChange={(e) => setSearchParams({ ...searchParams, minCapacity: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">AC Required?</label>
            <select
              value={searchParams.needsAC}
              onChange={(e) => setSearchParams({ ...searchParams, needsAC: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Any</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Attached Washroom Required?</label>
            <select
              value={searchParams.needsWashroom}
              onChange={(e) => setSearchParams({ ...searchParams, needsWashroom: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Any</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search Rooms
          </button>
        </form>
        {searchMsg && <p className="mt-3 text-red-600">{searchMsg}</p>}
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Results ({searchResults.length})</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {searchResults.map((r) => (
                <li key={r._id}>Room {r.roomNo} (Cap: {r.capacity})</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Allocate Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Allocate Room</h2>
        <form onSubmit={handleAllocate} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Number of Students *</label>
            <input
              type="number"
              min="1"
              value={allocParams.students}
              onChange={(e) => setAllocParams({ ...allocParams, students: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allocParams.needsAC}
              onChange={(e) => setAllocParams({ ...allocParams, needsAC: e.target.checked })}
              className="mr-2"
            />
            <label className="text-gray-700">Needs AC</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allocParams.needsWashroom}
              onChange={(e) => setAllocParams({ ...allocParams, needsWashroom: e.target.checked })}
              className="mr-2"
            />
            <label className="text-gray-700">Needs Attached Washroom</label>
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Allocate Smallest Room
          </button>
        </form>
        {allocMsg && <p className="mt-3 text-red-600">{allocMsg}</p>}
        {allocatedRoom && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
            <p className="font-bold text-green-800">✅ Allocated Room!</p>
            <p>Room No: {allocatedRoom.roomNo}</p>
            <p>Capacity: {allocatedRoom.capacity}</p>
            <p>AC: {allocatedRoom.hasAC ? 'Yes' : 'No'}</p>
            <p>Washroom: {allocatedRoom.hasAttachedWashroom ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAllocate;
