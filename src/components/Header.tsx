import { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Mic,
  Video,
  Bell,
  User,
  X,
} from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ onMenuToggle, onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showMobileSearch && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [showMobileSearch]);

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] h-14 flex items-center justify-between px-4">
      {/* Left section */}
      <div className={`flex items-center gap-4 ${showMobileSearch ? 'hidden sm:flex' : 'flex'}`}>
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-0.5 cursor-pointer">
          <svg viewBox="0 0 90 20" className="h-5 w-auto" preserveAspectRatio="xMidYMid meet">
            <g>
              <path d="M27.973 0H30.2l-5.78 20H22.23L16.45 0h2.227l4.648 16.676L27.973 0z" fill="#fff"/>
              <path d="M0 4.5C0 2.015 2.015 0 4.5 0h11C17.985 0 20 2.015 20 4.5v11c0 2.485-2.015 4.5-4.5 4.5h-11C2.015 20 0 17.985 0 15.5v-11z" fill="#FF0000"/>
              <path d="M13.5 10L7 6v8l6.5-4z" fill="#fff"/>
            </g>
          </svg>
          <span className="text-[20px] font-bold tracking-[-1.5px] ml-0.5">YouTube</span>
          <sup className="text-[10px] text-gray-400 font-normal -top-[0.7em]">IN</sup>
        </div>
      </div>

      {/* Center search - desktop */}
      <div className="hidden sm:flex items-center flex-1 max-w-[640px] mx-4 lg:mx-auto">
        <div className="flex flex-1 items-center">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (!e.target.value) onSearch('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="w-full bg-[#121212] border border-[#303030] rounded-l-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#1c62b9] text-base"
          />
          <button
            onClick={handleSearch}
            className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 py-2 hover:bg-[#303030] transition-colors"
            aria-label="Search"
          >
            <Search size={20} className="text-white" />
          </button>
        </div>
        <button className="ml-3 p-2.5 bg-[#222222] hover:bg-[#303030] rounded-full transition-colors" aria-label="Search with your voice">
          <Mic size={20} />
        </button>
      </div>

      {/* Mobile search overlay */}
      {showMobileSearch && (
        <div className="flex sm:hidden items-center flex-1 gap-2">
          <button onClick={() => { setShowMobileSearch(false); setSearchValue(''); onSearch(''); }} className="p-2 hover:bg-white/10 rounded-full">
            <X size={24} />
          </button>
          <input
            ref={mobileSearchRef}
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (!e.target.value) onSearch('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="flex-1 bg-[#121212] border border-[#303030] rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#1c62b9] text-base"
          />
          <button onClick={handleSearch} className="p-2 hover:bg-white/10 rounded-full" aria-label="Search">
            <Search size={20} />
          </button>
        </div>
      )}

      {/* Right section */}
      <div className={`flex items-center gap-1 ${showMobileSearch ? 'hidden sm:flex' : 'flex'}`}>
        <button
          onClick={() => setShowMobileSearch(true)}
          className="sm:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Search"
        >
          <Search size={24} />
        </button>
        <button className="hidden sm:flex p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Create">
          <Video size={24} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative" aria-label="Notifications">
          <Bell size={24} />
          <span className="absolute top-1 right-1 bg-red-600 text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>
        <button className="ml-1 p-1 rounded-full overflow-hidden" aria-label="User account">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  );
}
