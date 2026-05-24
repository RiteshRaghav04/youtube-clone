import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
  ChevronRight,
  History,
  ListVideo,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
}

const mainItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Compass, label: 'Explore', active: false },
  { icon: PlaySquare, label: 'Shorts', active: false },
  { icon: PlaySquare, label: 'Subscriptions', active: false },
];

const personalItems = [
  { icon: ListVideo, label: 'Library' },
  { icon: History, label: 'History' },
  { icon: PlaySquare, label: 'Your videos' },
  { icon: Clock, label: 'Watch later' },
  { icon: ThumbsUp, label: 'Liked videos' },
];

const exploreItems = [
  { icon: Flame, label: 'Trending' },
  { icon: ShoppingBag, label: 'Shopping' },
  { icon: Music2, label: 'Music' },
  { icon: Film, label: 'Films' },
  { icon: Radio, label: 'Live' },
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Newspaper, label: 'News' },
  { icon: Trophy, label: 'Sport' },
  { icon: Lightbulb, label: 'Learning' },
  { icon: Shirt, label: 'Fashion & beauty' },
  { icon: Podcast, label: 'Podcasts' },
];

const moreItems = [
  { icon: Settings, label: 'Settings' },
  { icon: Flag, label: 'Report history' },
  { icon: HelpCircle, label: 'Help' },
  { icon: MessageSquare, label: 'Send feedback' },
];

function SidebarSection({ items, title }: { items: { icon: typeof Home; label: string; active?: boolean }[]; title?: string }) {
  return (
    <div className="py-3 border-b border-[#272727]">
      {title && <h3 className="px-6 py-1 text-sm font-medium text-gray-400">{title}</h3>}
      {items.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={`w-full flex items-center gap-6 px-3 py-2.5 text-sm hover:bg-white/10 rounded-lg transition-colors ${
            active ? 'bg-white/10 font-medium' : 'font-normal'
          }`}
        >
          <Icon size={20} className={active ? 'text-white' : 'text-gray-400'} />
          <span className={active ? 'text-white' : 'text-gray-300'}>{label}</span>
        </button>
      ))}
    </div>
  );
}

export default function Sidebar({ open }: SidebarProps) {
  if (!open) {
    return (
      <aside className="fixed left-0 top-14 bottom-0 w-[72px] bg-[#0f0f0f] z-40 overflow-y-auto hidden md:block">
        <div className="py-1">
          {[
            { icon: Home, label: 'Home' },
            { icon: Compass, label: 'Explore' },
            { icon: PlaySquare, label: 'Shorts' },
            { icon: PlaySquare, label: 'Subs' },
            { icon: ListVideo, label: 'Library' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="w-full flex flex-col items-center gap-1.5 py-4 px-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Icon size={20} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">{label}</span>
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-60 bg-[#0f0f0f] z-40 overflow-y-auto scrollbar-thin hidden md:block">
      <div className="py-1">
        <SidebarSection items={mainItems} />
        <SidebarSection items={personalItems} />
        <SidebarSection items={exploreItems} title="Explore" />
        <SidebarSection items={moreItems} title="More from YouTube" />
        <div className="py-4 px-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            About Press Copyright Contact us Creators Advertise Developers
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mt-2">
            Terms Privacy Policy & Safety How YouTube works Test new features
          </p>
          <p className="text-xs text-gray-600 mt-4">&copy; 2024 Google LLC</p>
        </div>
      </div>
    </aside>
  );
}
