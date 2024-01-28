// SearchInput.jsx
import { useState, ChangeEvent } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
type SearchInputProps = {
  onSearch: (city: string) => void;
};
function SearchInput({ onSearch }:SearchInputProps) {
  const [city, setCity] = useState('');
  const [showClearButton, setShowClearButton] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCity(inputValue);
    setShowClearButton(!!inputValue);
  };
  const handleClearInput = () => {
    setCity('');
    setShowClearButton(false);
  };
  const handleSearch = () => {
    onSearch(city);
  };
  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <>
    
    <div className="relative flex gap-3 items-center mb-6">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="flex-1 p-4 border rounded-full focus:outline-none border-blue-500 transition-all duration-300"
      />
       {showClearButton && (
        <button
          onClick={handleClearInput}
          className="absolute right-16 p-2 rounded-full text-blue-500 hover:bg-blue-200 focus:outline-none"
        >
          <FaTimes />
        </button>
      )}
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
