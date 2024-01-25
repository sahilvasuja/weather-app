// SearchInput.jsx
import { useState, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
type SearchInputProps = {
  onSearch: (city: string) => void;
};
function SearchInput({ onSearch }:SearchInputProps) {
  const [city, setCity] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <>
    
    <div className="flex gap-3 items-center mb-6">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleInputChange}
        className="flex-1 p-4 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-all duration-300"
      />
      <button
        onClick={handleSearch}
        className="p-3 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600 transition-all duration-300"
      >
        <FaSearch className="text-2xl" />
      </button>
    </div>
    </>
   
  );
}

export default SearchInput;
