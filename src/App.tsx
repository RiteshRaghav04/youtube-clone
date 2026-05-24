import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryChips from './components/CategoryChips';
import VideoGrid from './components/VideoGrid';
import { videos, categories } from './data/mockData';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = activeCategory === 'All'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const searchedVideos = searchQuery
    ? filteredVideos.filter(v =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channel.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredVideos;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onSearch={setSearchQuery}
      />
      <div className="flex pt-14">
        <Sidebar open={sidebarOpen} />
        <main className={`flex-1 transition-all duration-200 ${sidebarOpen ? 'ml-60' : 'ml-0'}`}>
          <CategoryChips
            categories={categories}
            active={activeCategory}
            onSelect={setActiveCategory}
          />
          <VideoGrid videos={searchedVideos} />
        </main>
      </div>
    </div>
  );
}

export default App;
