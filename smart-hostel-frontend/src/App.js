import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddRoom from './components/Addroom';
import ViewRooms from './components/ViewRooms';
import SearchAllocate from './components/SearchAllocate';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<ViewRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/search-allocate" element={<SearchAllocate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;