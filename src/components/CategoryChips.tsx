import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface CategoryChipsProps {
  categories: string[];
  active: string;
  onSelect: (cat: string) => void;
}

export default function CategoryChips({ categories, active, onSelect }: CategoryChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  return (
    <div className="sticky top-14 z-30 bg-[#0f0f0f] border-b border-[#272727]">
      <div className="relative px-4 py-3">
        {showLeft && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center z-10">
            <div className="bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f] to-transparent pr-8 pl-4 h-full flex items-center">
              <button
                onClick={() => scroll('left')}
                className="p-1.5 bg-[#272727] hover:bg-[#3a3a3a] rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>
        )}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-none"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active === cat
                  ? 'bg-white text-black'
                  : 'bg-[#272727] text-white hover:bg-[#3a3a3a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {showRight && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center z-10">
            <div className="bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f] to-transparent pl-8 pr-4 h-full flex items-center">
              <button
                onClick={() => scroll('right')}
                className="p-1.5 bg-[#272727] hover:bg-[#3a3a3a] rounded-full transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
