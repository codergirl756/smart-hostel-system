import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex space-x-6">
        <Link to="/" className="font-medium hover:underline">View Rooms</Link>
        <Link to="/add-room" className="font-medium hover:underline">Add Room</Link>
        <Link to="/search-allocate" className="font-medium hover:underline">Search & Allocate</Link>
      </div>
    </nav>
  );
};

export default Navbar;