import { CheckCircle2 } from 'lucide-react';
import type { Video } from '../data/mockData';

interface VideoGridProps {
  videos: Video[];
}

function VideoCard({ video }: { video: Video }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden aspect-video bg-[#272727]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span
          className={`absolute bottom-1.5 right-1.5 px-1.5 py-0.5 text-xs font-medium rounded ${
            video.duration === 'LIVE'
              ? 'bg-red-600 text-white'
              : 'bg-black/80 text-white'
          }`}
        >
          {video.duration}
        </span>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="flex-shrink-0">
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="w-9 h-9 rounded-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white leading-5 line-clamp-2 group-hover:text-white">
            {video.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm text-gray-400 hover:text-gray-300">{video.channel}</span>
            {video.verified && <CheckCircle2 size={14} className="text-gray-400" fill="currentColor" />}
          </div>
          <p className="text-sm text-gray-400">
            {video.views} &bull; {video.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="mb-4 opacity-40">
          <path d="M21 6H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V7a1 1 0 00-1-1zM10 14V8l5 3-5 3z" fill="currentColor"/>
        </svg>
        <p className="text-lg font-medium">No videos found</p>
        <p className="text-sm mt-1">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4 sm:p-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
