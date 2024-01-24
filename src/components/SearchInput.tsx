// SearchInput.jsx
import { useState, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchInput({ onSearch }:any) {
  const [city, setCity] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleInputChange}
        className="mr-2 p-4 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-all duration-300"
      />
      <button
        onClick={handleSearch}
        className="p-3 flex items-center bg-blue-500 text-white rounded-full text-center focus:outline-none hover:bg-blue-600 transition-all duration-300"
      >
        <FaSearch className="text-2xl" />
      </button>
    </div>
  );
}

export default SearchInput;