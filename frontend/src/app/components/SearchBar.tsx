import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search events, topics, or locations..." }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-[#FBF6F2] rounded-full px-4 py-2 shadow-sm border border-gray-200">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="flex-1 ml-2 outline-none text-sm bg-transparent"
        />
        {query && (
          <button onClick={clearSearch} className="ml-2">
            <X size={18} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}
